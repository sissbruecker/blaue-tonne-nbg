import os
import uuid
from argparse import ArgumentParser
from datetime import datetime, timedelta, date
from json import load

import vobject

parser = ArgumentParser(description="Generate tour calendar files from scraped flat data JSON file")
parser.add_argument("input",
                    help="Flat JSON input file")
parser.add_argument("output",
                    help="Output folder for calendar files")

args = parser.parse_args()

print("Using flat data file: " + args.input)

# Read flat data
with open(args.input) as input_file:
    data = load(input_file)

# Generate calendar file for each tour
for tour in data:
    tour_id = tour["tour_id"]

    cal = vobject.iCalendar()

    for event in tour["events"]:

        event_id = str(uuid.uuid4())
        event_start = datetime.strptime(event, "%Y-%m-%d")
        event_start = date(event_start.year, event_start.month, event_start.day)
        event_end = event_start + timedelta(days=1)

        e = cal.add('vevent')
        e.add('uid').value = event_id
        e.add('summary').value = 'Blaue Tonne'
        e.add('dtstart').value = event_start
        e.add('dtend').value = event_end

    cal_file_name = os.path.join(args.output, tour_id + ".ics")

    with open(cal_file_name, "w") as output_file:
        output_file.write(cal.serialize())
