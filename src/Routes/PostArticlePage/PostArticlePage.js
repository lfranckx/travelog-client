import React, { Component } from 'react';
import './PostArticlePage.css';
import PostArticleForm from '../../Components/PostArticleForm/PostArticleForm';
import ArticleContext from '../../Contexts/ArticleContext';

export default class PostArticlePage extends Component {
    static defaultProps = {
        location: {},
        history: {
            push:() => {}
        }
    }

    static contextType = ArticleContext;

    handleSubmitForm = () => {
        const { user } = this.context;
        const { location, history } = this.props;
        const destination = (location.state || {}).from || `/profile/${user.username}`;
        history.push(destination);
    }

    render() {
        return (
            <section className="post-article-section">
                <PostArticleForm 
                    onSubmitSuccess={this.handleSubmitForm}
                />
            </section>
        );
    }
}