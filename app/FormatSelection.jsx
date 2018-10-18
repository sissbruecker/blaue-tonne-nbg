// noinspection ES6UnusedImports
import { Component, h } from 'preact';
import { CalendarFormat } from './CalendarFormat';

export class FormatSelection extends Component {

    constructor() {
        super();
        this.handleSelect = this.handleSelect.bind(this);
    }

    handleSelect(e) {
        const format = e.target.dataset.format;
        this.props.onChange && this.props.onChange(format);
    }

    render() {
        return (
            <div className='format-selection'>
                <label>Format</label>
                <ul class='button-bar'>
                    {this.renderFormatButton('Kalender (Weblink)', CalendarFormat.CALENDAR_LINK)}
                    {this.renderFormatButton('Kalender (Download)', CalendarFormat.CALENDAR_DOWNLOAD)}
                    {this.renderFormatButton('PDF', CalendarFormat.PDF_DOWNLOAD)}
                </ul>
                <div>
                    {showHelp(this.props.selectedFormat)}
                </div>
            </div>
        )
    }

    renderFormatButton(title, format) {
        const styles = format === this.props.selectedFormat
            ? 'button'
            : 'button button-outline';

        return (
            <li className={styles}
                        data-format={format}
                        onClick={this.handleSelect}>{title}
            </li>
        )
    }
}

function showHelp(format) {
    switch (format) {
        case CalendarFormat.CALENDAR_LINK:
            return calendarWeblinkHelp();
        case CalendarFormat.CALENDAR_DOWNLOAD:
            return calendarDownloadHelp();
        case CalendarFormat.PDF_DOWNLOAD:
            return pdfDownloadHelp();
    }
}

function calendarWeblinkHelp() {
    return (
        <p className='help'>
            Per Klick auf den Link wird automatisch die Kalenderapplikation auf Ihrem PC geöffnet und bietet Ihnen an
            den Kalender zu abonnieren. Klappt dies nicht, probieren Sie <b>Kalender (Download)</b>.
        </p>
    )
}

function calendarDownloadHelp() {
    return (
        <p className='help'>
            Der Kalender wird als .ics Datei heruntergeladen. Anschließend können Sie die Datei manuell in Ihre
            Kalenderapplikation importieren.
        </p>
    )
}

function pdfDownloadHelp() {
    return (
        <p className='help'>
            Sollten Sie über keine Kalenderapplikation verfügen, können Sie den Kalender auch als PDF Datei
            herunterladen und nach Wunsch ausdrucken.
        </p>
    )
}
