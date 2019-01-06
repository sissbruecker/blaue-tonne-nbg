from datetime import date
from urllib.parse import urlparse, parse_qs

import scrapy


class CalendarSpider(scrapy.Spider):
    name = "calendars"
    start_urls = [
        'https://www.ana-abfallentsorgung-nuernberg.de/cms/modules.php?name=Abfuhr&op=ListStreets&entry=0&abfallart=1',
    ]

    def parse(self, response):
        for street_row in response.css('div.tmpltable table.tableLine tr'):

            # Skip header row
            if street_row.css('td[class=row_head]').extract_first() is not None:
                continue

            for tour_link in street_row.css('td a'):
                tour_data = parse_tour_data(street_row, tour_link)

                request = scrapy.Request(tour_data["tour_url"], parse_calendar)
                request.meta["tour_data"] = tour_data

                yield request

        next_page = response.css('a[title="Seite vor"]::attr("href")').extract_first()
        if next_page is not None:
            yield response.follow(next_page, self.parse)


def parse_year_events(year_table):
    year_string = year_table.css('tr:first-child p font b::text').extract_first()
    year = int(year_string)

    event_texts = year_table.css('tr:not(:first-child) td:nth-child(3) p font::text').extract()
    events = [parse_event(text, year) for text in event_texts]

    return events


def parse_calendar(response):

    events = []
    year_tables = response.css('table.contentpaneopen table.contentpaneopen table')

    for year_table in year_tables:
        events += parse_year_events(year_table)

    calendar_data = dict(response.meta["tour_data"])
    calendar_data["events"] = events

    yield calendar_data


def parse_tour_data(street_row, tour_link):
    url = tour_link.attrib["href"]
    url_data = urlparse(url)
    query_data = parse_qs(url_data.query)

    street_name = clean_text(street_row.css('td:nth-child(1) b::text').extract_first())
    tour_name = clean_text(tour_link.root.text)
    street_id = query_data['Strassen_Nr'][0]
    tour_id = query_data['LfdNr'][0]

    return {
        "street_id": street_id,
        "tour_id": tour_id,
        "street_name": street_name,
        "tour_name": tour_name,
        "tour_url": "https://www.ana-abfallentsorgung-nuernberg.de/cms/" + url,
    }


MONTH_MAP = {
    "Jan": 1,
    "Feb": 2,
    "März": 3,
    "Apr": 4,
    "Mai": 5,
    "Juni": 6,
    "Juli": 7,
    "Aug": 8,
    "Sep": 9,
    "Okt": 10,
    "Nov": 11,
    "Dez": 12,
}


def parse_event(text, year):
    text = text.replace(".", "")
    parts = text.split()
    day = int(parts[0])
    month = MONTH_MAP[parts[1]]

    return date(year, month, day)


def clean_text(value):
    if value is None:
        return None

    return value \
        .replace('&nbsp', '') \
        .strip()
