// noinspection ES6UnusedImports
import { Component, h } from 'preact';

export class SearchInput extends Component {

    constructor() {
        super();
        this.handleInput = this.handleInput.bind(this);
    }

    handleInput(e) {
        const text = e.target.value;

        this.props.onChange && this.props.onChange(text);
    }

    render() {
        return (
            <div className='search-input'>
                <label for='input_search'>Suche</label>
                <input id='input_search'
                       type='search'
                       placeholder='Straßennamen eingeben...'
                       value={this.props.searchText}
                       onInput={this.handleInput}/>
            </div>
        );
    }
}
