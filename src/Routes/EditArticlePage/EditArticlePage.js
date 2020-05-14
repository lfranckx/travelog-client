import React, { Component } from 'react';
import './EditArticlePage.css';
import EditArticleForm from '../../Components/EditArticleForm/EditArticleForm';
import ArticleContext from '../../Contexts/ArticleContext';
import ArticleApiService from '../../Services/article-api-service';

export default class EditArticlePage extends Component {
    static defaultProps = {
        location: {},
        history: {
            push:() => {}
        },
        match: { params: {} }
    }

    static contextType = ArticleContext;

    componentDidMount() {
        this.context.clearError();
        const articleId = this.props.match.params.articleId;
        ArticleApiService.getArticle(articleId)
            .then(this.context.setArticle)
            .catch(this.context.setError)
    }

    handleSubmitForm = () => {
        const { user } = this.context;
        ArticleApiService.getByUsername(user.username)
            .then(this.context.setUsersArticles)
            .catch(this.context.setError);
        const { location, history } = this.props;
        const destination = (location.state || {}).from || `/profile/${user.username}`;
        history.push(destination)    
    }

    render() {
        const { article } = this.context;
        return (
            <section>
                <EditArticleForm 
                    onSubmitForm={this.handleSubmitForm}
                    article={article}    
                />
            </section>        
        )
    }
}