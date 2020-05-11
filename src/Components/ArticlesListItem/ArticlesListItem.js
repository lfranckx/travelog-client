import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import './ArticlesListItem.css';

export default class ArticlesListItem extends Component {
    
    render() {
        const { article, authors } = this.props;

        let authorObject;
        authors.map(author => {
            if (author.author_id === article.user_id)
                authorObject = author; 
            return authorObject;
        });

        if (!authorObject) {
            return <div className="loading">Loading...</div>
        }
        
        return (
                <article>
                    <div>{article.date}</div>
                    <Link to={`/author/${authorObject.author_id}`}>
                        <div>{article.author}</div>
                    </Link>
                    <Link to={`/article/${article.id}`}>
                        <img className="thumbnail" src={article.image_url} alt="thumbnail" />
                        <h3>{article.title}</h3>
                        <h4>{article.description}</h4>
                        <p>Read more...</p>
                    </Link>
                </article>
            
        );
    }
}