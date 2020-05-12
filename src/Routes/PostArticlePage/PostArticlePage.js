import React, { Component } from 'react';
import './PostArticlePage.css';
import PostArticleForm from '../../Components/PostArticleForm/PostArticleForm';
import ArticleContext from '../../Contexts/ArticleContext';
// import ArticleApiService from '../../Services/article-api-service';

export default class PostArticlePage extends Component {
    static defaultProps = {
        location: {},
        history: {
            push:() => {}
        }
    }

    static contextType = ArticleContext;

    handleSubmitForm = () => {
        const { article } = this.context;
        const { location, history } = this.props;
        const destination = (location.state || {}).from || `/upload/${article.id}`;
        history.push(destination)
    }

    render() {
        console.log('PostArticlePage context', this.context);
        
        return (
            <section className="post-article-section">
                <PostArticleForm 
                    onSubmitSuccess={this.handleSubmitForm}
                />
            </section>
        );
    }
}