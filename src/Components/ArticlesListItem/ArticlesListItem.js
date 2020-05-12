import React, { Component } from 'react';
import './ArticlesListItem.css';
import { Link } from 'react-router-dom';


export default class ArticlesListItem extends Component {
    
    render() {
        const { article, authors } = this.props;

        let authorObject;
        authors.map(author => {
            if (author.user_id === article.user_id)
                authorObject = author; 
            return authorObject;
        });

        if (!authorObject) {
            return <div className="loading">Loading...</div>
        }
        
        return (
                <article>
                    <div className="main-page-container">
                        <Link 
                                to={`/author/${authorObject.user_id}`}
                                className="author">
                            <img src={article.profile_image} alt="author-profile" className="author-profile" />
                        </Link>
                        <div>
                            <Link 
                                to={`/author/${authorObject.user_id}`}
                                className="author">
                                {article.author}
                            </Link>
                            <div>{article.date}</div>
                        </div>
                    </div>
                    
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