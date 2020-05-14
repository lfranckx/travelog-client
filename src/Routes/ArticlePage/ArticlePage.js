import React, { Component } from 'react';
import './ArticlePage.css';
import ArticleContext from '../../Contexts/ArticleContext'; 
import ArticleApiService from '../../Services/article-api-service';
import { Link } from 'react-router-dom';
import CommentsForm from '../../Components/CommentsForm/CommentsForm';

export default class ArticlePage extends Component {
    static defaultProps = {
        match: { params: {} },
    }

    static contextType = ArticleContext;

    componentDidMount() {
        console.log('article page mounted');
        
        const { articleId } = this.props.match.params;
        this.context.clearError();
        ArticleApiService.getArticle(articleId)
            .then(this.context.setArticle)
            .catch(this.context.setError);
    }

    componentWillUnmount() {
        this.context.clearArticle();
    }

    renderArticle() {
        const { article, user } = this.context;
        // Link to user's profile page if their article
        if (user.username === article.username) {
            return (<section className="article-page">
                        <h2>{article.title}</h2>
                        <Link to={`/profile/${user.username}`} className="author-container">
                            <img src={user.profile_image} alt="author-profile" className="profile-image"/> 
                            <div>{article.author}</div>
                        </Link>
                        <img 
                            src={article.image_url} 
                            alt={article.title}
                            className="article-image"
                        />
                        <p>
                            {article.body}
                        </p>
                        <CommentsForm article={article}/>
                    </section>)
        }
        return (
            <section className="article-page">
                <h2>{article.title}</h2>
                <Link to={`/author/${article.username}`} className="author-container">
                    <img src={article.profile_image} alt="author-profile" className="profile-image"/> 
                    <div>{article.author}</div>
                </Link>
                <img 
                    src={article.image_url} 
                    alt={article.title}
                    className="article-image"
                />
                <p>
                    {article.body}
                </p>
                <CommentsForm article={article}/>
            </section>
        );
    }

    render() {
        const { error, article } = this.context;
        let content;
        if (error) {
            content = (error.error === "Article doesn't exist")
                ? <p className="error">Article not found</p>
                : <p className="error">There was an error</p>;
        } else if(!article.id) {
            content = <div className="loading">Loading...</div>;
        } else {
            content = this.renderArticle();
        }
        return (
            <>
                {content}
            </>
        );
    }
}
