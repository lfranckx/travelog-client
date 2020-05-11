import React, { Component } from 'react';
import './AuthorsListItem.css';
import { Link } from 'react-router-dom';

export default class AuthorsListItem extends Component {

    render() {
        const { article } = this.props;
        return (
            <article>
                <Link to={`/article/${article.id}`}>
                    <img src={article.image_url} alt="thumbnail" className="thumbnail"/>
                </Link>
                <Link to={`/article/${article.id}`} className="list-item-container">
                    <h2>{article.title}</h2>
                    <h3>{article.description}</h3>
                    <div>{article.date}</div>
                    <div>Read more</div>
                </Link>
            </article>
        )
    }
}