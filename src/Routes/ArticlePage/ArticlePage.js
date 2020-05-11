import React, { Component } from 'react';
import './ArticlePage.css';
import ArticleContext from '../../Contexts/ArticleContext'; 
import ArticleApiService from '../../Services/article-api-service';

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
    }

    componentWillUnmount() {
        this.context.clearArticle();
    }

    renderArticle() {
        const { article, author } = this.context;
        return (
            <section className="article-page">
                <div className="author-container">
                    <div>{article.author}</div>
                    <img src={author.profile_image} alt="author-profile"/> 
                </div>
                <img src={article.image_url} alt={article.image_filename || "something"}/>
                <p>
                    {article.body}
                </p>
            </section>
        );
    }

    render() {
        const { error, article } = this.context;
        console.log('ArticlePage Context', this.context);
        
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
