/*eslint semi: ["error", "always"]*/

import React, { Component } from 'react';
// import { Link } from 'react-router-dom';

import './ArticlesListItem.css';

export default class ArticlesListItem extends Component {
    
    render() {
        const { article } = this.props;
        return (
            <article>
                <div>{article.date}</div>
                <div>{article.author}</div>
                <img className="thumbnail" src={article.image_url} alt="thumbnail" />
                <h3>{article.title}</h3>
                <h4>{article.description}</h4>
                <a href={`/article/${article.id}`}>Read more...</a>
            </article>
        );
    }
}