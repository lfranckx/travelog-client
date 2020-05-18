import React, { Component } from 'react';
import './Searchbar.css';
import ArticleContext from '../../Contexts/ArticleContext';

export default class SearchBar extends Component {
    static contextType = ArticleContext;

    render() {        
        return (
            <form className="searchbar">
                <label className="hidden"
                    htmlFor='searchbar-input'>search</label>
                    <input 
                        type="text" 
                        name="search"
                        aria-label="search"
                        className="searchbar"
                        id='searchbar-input'
                        placeholder="search by title"
                        onChange={this.context.updateSearch.bind(this)}
                    />
            </form>
        )
    }
}