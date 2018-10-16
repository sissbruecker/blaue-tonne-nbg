// noinspection ES6UnusedImports
import { Component, h } from 'preact';

export class SearchResults extends Component {

    render() {

        const items = this.props.searchResults.map(renderResult);

        return items.length > 0 && (
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
        );
    }
}

function renderResult(result) {

    const tourLinks = result.tours.map((tour, index) => (
        <span>
            {
                index !== 0 &&
                <span> | </span>
            }
            <a href={buildCalendarLink(tour)}>{tour.tour_name}</a>
        </span>
    ));

    return (
        <tr>
            <td>{result.street_name}</td>
            <td>{tourLinks}</td>
        </tr>
    )
}

function buildCalendarLink(tour) {
    const l = window.location;
    return ['webcal:/', l.host, 'cal', `${tour.tour_id}.ics`].join('/')
}
