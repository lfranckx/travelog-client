import React, { Component } from 'react';
import './ArticlesListItem.css';
import { Link } from 'react-router-dom';
import ArticleContext from '../../Contexts/ArticleContext';

export default class ArticlesListItem extends Component {
    static contextType = ArticleContext;

    render() {
        const noimage = "https://travelog-files.s3-us-west-1.amazonaws.com/icons/noimage.png";
        const { article, authors } = this.props;
        const date = article.date.slice(0, 16);

        let authorObject;
        authors.map(author => {
            if (author.username === article.username)
                authorObject = author; 
            return authorObject;
        });
        if (!authorObject) {
            return  <div className="loading">Loading...</div>
        }
        if (!article.image_url) {
            article.image_url = noimage;
        }
        return (
            <article>
                <div className="article-container">
                    <Link 
                        to={`/author/${authorObject.username}`}
                        className="author">
                        <img src={article.profile_image} alt={`${article.author}-profile`} className="author-profile" />
                    </Link>
                    <div>
                        <Link 
                            to={`/author/${authorObject.username}`}
                            className="author">
                            {article.author}
                        </Link>
                        <div className="article-date">{date}</div>
                    </div>
                </div>
                
                <Link to={`/article/${article.id}`}>
                    <img className="thumbnail" src={article.image_url} alt={`${article.title}-thumbnail`} />
                    <h3>{article.title}</h3>
                    <h4>{article.description}</h4>
                    <div className="read-more">Read more...</div>
                </Link>
            </article>
        );
    }
}