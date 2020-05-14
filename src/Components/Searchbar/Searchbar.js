import React, { Component } from 'react';
import './Searchbar.css';
import ArticleContext from '../../Contexts/ArticleContext';

export default class SearchBar extends Component {
    static contextType = ArticleContext;

    updateSearchContext = ev => {
        ev.preventDefault();
        const { search } = ev.target;
        console.log('search', search.value);
        this.context.updateSearch(search.value);
    }

    render() {        
        return (
            <form onSubmit={this.updateSearchContext} >
                <label className="hidden">search</label>
                    <input 
                        type="text" 
                        name="search"
                        aria-label="search"
                        className="search-input"
                        placeHolder="search by title"
                    />
                    <button type="submit" name="search-button" id="search-button">
                        <i className="fa fa-search"></i>
                    </button>
            </form>
        )
    }
}