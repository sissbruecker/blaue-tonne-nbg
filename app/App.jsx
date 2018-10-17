// noinspection ES6UnusedImports
import { Component, h } from 'preact';
import { SearchInput } from './SearchInput';
import db from '../data/index.json';
import { SearchResults } from './SearchResults';
import { FormatSelection } from './FormatSelection';
import { CalendarFormat } from './CalendarFormat';

export class App extends Component {

    constructor() {
        super();

        this.state = {
            searchText: '',
            searchResults: [],
            format: CalendarFormat.CALENDAR_LINK,
        };

        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleFormatChange = this.handleFormatChange.bind(this);
    }

    handleInputChange(searchText) {

        const searchResults = search(searchText);

        this.setState({
            searchText,
            searchResults
        });
    }

    handleFormatChange(format) {
        this.setState({
            format
        });
    }

    render() {
        return (
            <div>
                <div className='form'>
                    <SearchInput searchText={this.state.searchText}
                                 onChange={this.handleInputChange}/>
                    <FormatSelection selectedFormat={this.state.format}
                                     onChange={this.handleFormatChange}/>
                </div>
                {
                    this.state.searchResults.length > 0 &&
                    <div className='results'>
                        <hr/>
                        <SearchResults searchResults={this.state.searchResults}
                                       format={this.state.format}/>
                    </div>
                }
            </div>
        )
    }
}

function search(searchText) {
    return searchText && searchText.length >= 3
        ? db.filter(street => street.street_name.toLowerCase().indexOf(searchText.toLowerCase()) === 0)
        : [];
}
