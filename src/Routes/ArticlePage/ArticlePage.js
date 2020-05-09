/*eslint semi: ["error", "always"]*/
import React, { Component } from 'react';
import ArticleContext from '../../Contexts/ArticleContext'; 
import './ArticlePage.css';

export default class ArticlePage extends Component {
    static defaultProps = {
        match: { params: {} },
    }

    static contextType = ArticleContext

    componentDidMount() {
        console.log('articlepage did mount');
        // const { articleId } = this.props.match.params;
        this.context.clearError();
        this.context.setAuthor();
    }

    componentWillUnmount() {
        this.context.clearArticle();
    }

    renderArticle() {
        const { article, author } = this.context;
        return <>
            <section className="about">
                <div className="author-container">
                    <div>{article.author}</div>
                    <img src={author.profile_image} alt="author-profile"/> 
                </div>
            </section>
            <img src={article.image_url} alt={article.image_filename || "something"}/>
        </>;
    }

    render() {
        // const { error, article } = this.context;
        // console.log('context.article', article);
        console.log(this.context);
        const article  = this.context.articlesList[0];
        const { error } = this.context;
        
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
            <section className="article-page">
                {content}
            </section>
        );
    }
}
