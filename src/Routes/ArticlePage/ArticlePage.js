import React, { Component } from 'react';
import './ArticlePage.css';
import ArticleContext from '../../Contexts/ArticleContext'; 
import ArticleApiService from '../../Services/article-api-service';
import { Link } from 'react-router-dom';
import Comments from '../../Components/Comments/Comments';

export default class ArticlePage extends Component {
    static defaultProps = {
        match: { params: {} },
    }

    static contextType = ArticleContext;

    componentDidMount() {        
        const { articleId } = this.props.match.params;
        this.context.clearError();
        ArticleApiService.getArticle(articleId)
            .then(this.context.setArticle)
            .catch(this.context.setError);
        ArticleApiService.getArticleComments(articleId)
            .then(this.context.setComments)
            .catch(this.context.setError);
    }

    componentWillUnmount() {
        this.context.clearArticle();
    }

    renderArticle() {
        const { article, user, comments } = this.context;
        // Link to user's profile page if on their article page
        if (user.username === article.username) {
            return (
                <>
                    <section className="article-page">
                        <h2>{article.title}</h2>
                        <Link to={`/profile/${user.username}`} className="author-container">
                            <img src={user.profile_image} alt="author-profile" className="profile-image"/> 
                            <h3>{article.author}</h3>
                        </Link>
                        <img 
                            src={article.image_url} 
                            alt={article.title}
                            className="article-image"
                        />
                        <p className="body">
                            {article.body}
                        </p>
                    </section>
                    <Comments article={article} 
                        comments={comments} />
                </>
            );
        }
        // if it is not the current user's article
        return ( 
            <>
                <section className="article-page">
                    <h2>{article.title}</h2>
                    <Link to={`/author/${article.username}`} className="author-container">
                        <img src={article.profile_image} alt="author-profile" className="profile-image"/> 
                        <h3>{article.author}</h3>
                    </Link>
                    <img 
                        src={article.image_url} 
                        alt={article.title}
                        className="article-image"
                    />
                    <p className="body">{article.body}</p>
                </section>
                <Comments article={article} 
                    comments={comments} />
            </>
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
        return <>{content}</>
    }
}