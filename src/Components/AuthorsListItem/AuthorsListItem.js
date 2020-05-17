import React, { Component } from 'react';
import './AuthorsListItem.css';
import { Link } from 'react-router-dom';
import trash from '../../icons/trash.png';
import pencil from '../../icons/pencil.png';
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
        const { user } = this.context;
        const date = article.date.slice(0, 16);

        if (user.username !== article.username) {
            return (
                <article>
                    <Link to={`/article/${article.id}`}>
                        <img src={article.image_url} alt="thumbnail" className="thumbnail"/>
                    </Link>
                    <Link to={`/article/${article.id}`} className="center">
                        <h3>{article.title}</h3>
                        <h4>{article.description}</h4>
                        <div className="date">{date}</div>
                        <div>Read more</div>
                    </Link>
                    <div></div>
                </article>
            )
        }
        return (
            <article>
                <Link to={`/article/${article.id}`}>
                    <img src={article.image_url} alt="thumbnail" className="thumbnail"/>
                </Link>
                    <Link to={`/article/${article.id}`} className="center">
                        <h3>{article.title}</h3>
                        <h4>{article.description}</h4>
                        <div className="date">{date}</div>
                        <div>Read more</div>
                    </Link>
                <div className="article-buttons">
                    <Link to={`/edit/${article.id}`}>
                        <img 
                            src={pencil} 
                            alt="pencil" 
                            className="pencil edit-delete"
                        />
                    </Link>
                    <img 
                        src={trash} 
                        alt="trash" 
                        className="trash edit-delete"
                        onClick={this.handleDelete}
                    />
                </div>
            </article>
        )
    }
}