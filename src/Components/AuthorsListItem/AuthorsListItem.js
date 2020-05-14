import React, { Component } from 'react';
import './AuthorsListItem.css';
import { Link } from 'react-router-dom';
import trash from '../../icons/trash.png';
import ArticleApiService from '../../Services/article-api-service';
import ArticleContext from '../../Contexts/ArticleContext';

export default class AuthorsListItem extends Component {

    static contextType = ArticleContext

    handleDelete = () => {
        const { article } = this.props;
        const { user } = this.context;
        ArticleApiService.deleteArticle(article.id)
            .then(res => {
                ArticleApiService.getByUsername(user.username)
                .then(this.context.setUsersArticles)
                .catch(this.context.setError);
            })
    }

    render() {
        const { article } = this.props;
        const date = article.date.slice(0, 16);

        return (
            <article>
                <Link to={`/article/${article.id}`}>
                    <img src={article.image_url} alt="thumbnail" className="thumbnail"/>
                </Link>
                <Link to={`/article/${article.id}`} className="list-item-container">
                    <h2>{article.title}</h2>
                    <h3>{article.description}</h3>
                    <div>{date}</div>
                    <div>Read more</div>
                </Link>
                <button>
                    <img 
                        src={trash} 
                        alt="trash" 
                        className="trash"
                        onClick={this.handleDelete}
                    />
                </button>
            </article>
        )
    }
}