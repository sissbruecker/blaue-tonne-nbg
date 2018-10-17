// noinspection ES6UnusedImports
import { Component, h } from 'preact';
import { CalendarFormat } from './CalendarFormat';

export class SearchResults extends Component {

    render() {

        const format = this.props.format;
        const items = this.props.searchResults.map(result => renderResult(result, format));

        return (
            <table>
                <thead>
                <tr>
                    <th>Straße</th>
                    <th>Touren</th>
                </tr>
                </thead>
                <tbody>
                {items}
                </tbody>
            </table>
        )
    }
}

function renderResult(result, format) {

    const tourLinks = result.tours.map((tour, index) => (
        <span>
            {
                index !== 0 &&
                <span> | </span>
            }
            <a href={buildCalendarLink(tour, format)}>{tour.tour_name}</a>
        </span>
    ));

    return (
        <tr>
            <td>{result.street_name}</td>
            <td>{tourLinks}</td>
        </tr>
    )
}

function buildCalendarLink(tour, format) {
    switch (format) {
        case CalendarFormat.CALENDAR_LINK:
            return calendarWebLink(tour);
        case CalendarFormat.CALENDAR_DOWNLOAD:
            return calendarDownloadLink(tour);
        case CalendarFormat.PDF_DOWNLOAD:
            return pdfDownloadLink(tour);
    }
}

function calendarWebLink(tour) {
    const l = window.location;
    return ['webcal:/', l.host, 'cal', `${tour.tour_id}.ics`].join('/')
}

function calendarDownloadLink(tour) {
    const l = window.location;
    return [l.protocol, '/', l.host, 'cal', `${tour.tour_id}.ics`].join('/')
}

function pdfDownloadLink(tour) {
    const l = window.location;
    return [l.protocol, '/', l.host, 'cal', `${tour.tour_id}.pdf`].join('/')
}
