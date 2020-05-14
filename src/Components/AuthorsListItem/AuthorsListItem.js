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
                <Link to={`/article/${article.id}`} className="list-item-container">
                    <h3>{article.title}</h3>
                    <h4>{article.description}</h4>
                    <div>{date}</div>
                    <div>Read more</div>
                </Link>
            </article>
            )
        }
        return (
            <article>
                <Link to={`/article/${article.id}`}>
                    <img src={article.image_url} alt="thumbnail" className="thumbnail"/>
                </Link>
                <Link to={`/article/${article.id}`} className="list-item-container">
                    <h3>{article.title}</h3>
                    <h4>{article.description}</h4>
                    <div>{date}</div>
                    <div>Read more</div>
                </Link>
                <div id="article-buttons">
                    <Link to={`/edit/${article.id}`}>
                        <button>
                            <img 
                                src={pencil} 
                                alt="pencil" 
                                className="pencil"
                            />
                        </button>
                    </Link>
                    <button>
                        <img 
                            src={trash} 
                            alt="trash" 
                            className="trash"
                            onClick={this.handleDelete}
                        />
                    </button>
                </div>
            </article>
        )
    }
}