// noinspection ES6UnusedImports
import { Component, h } from 'preact';
import { SearchInput } from './SearchInput';
import db from '../data/index.json';
import { SearchResults } from './SearchResults';

export class App extends Component {

    constructor() {
        super();

        this.state = {
            searchText: '',
            searchResults: []
        };

        this.handleInputChange = this.handleInputChange.bind(this);
    }

    handleInputChange(searchText) {

        const searchResults = search(searchText);

        this.setState({
            searchText,
            searchResults
        });
    }

    render() {
        return (
            <div>
                <SearchInput searchText={this.state.searchText}
                             onChange={this.handleInputChange}/>
                <SearchResults searchResults={this.state.searchResults}/>
            </div>
        )
    }
}

function search(searchText) {
    return searchText && searchText.length >= 3
        ? db.filter(street => street.street_name.toLowerCase().indexOf(searchText.toLowerCase()) === 0)
        : [];
}
