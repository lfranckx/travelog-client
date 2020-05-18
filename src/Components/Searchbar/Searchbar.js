import React, { Component } from 'react';
import './Searchbar.css';
import ArticleContext from '../../Contexts/ArticleContext';

export default class SearchBar extends Component {
    static contextType = ArticleContext;

    render() {        
        return (
            <form className="searchbar">
                <label className="hidden">search</label>
                    <input 
                        type="text" 
                        name="search"
                        aria-label="search"
                        className="searchbar"
                        placeholder="search by title"
                        onChange={this.context.updateSearch.bind(this)}
                    />
            </form>
        )
    }
}