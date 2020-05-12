import React, { Component } from 'react';
import './MainPage.css';
import ArticlesListItem from '../../Components/ArticlesListItem/ArticlesListItem';
import ArticleContext from '../../Contexts/ArticleContext';
import ArticleApiService from '../../Services/article-api-service';
import AuthorApiService from '../../Services/author-api-service';
import TokenService from '../../Services/token-service';

class MainPage extends Component {
    static contextType = ArticleContext;

    componentDidMount() {
        this.context.clearError();
        ArticleApiService.getArticles()
            .then(this.context.setArticlesList)
            .catch(this.context.setError);
        AuthorApiService.getAuthors()
            .then(this.context.setAuthorsList)
            .catch(this.context.setError);
        if(TokenService.hasAuthToken()){
            AuthorApiService.getLoggedInAuthor()
                .then(this.context.setUser)
                .catch(this.context.setError);
        }
        
    }

    renderArticles() {
        const { articlesList = [] } = this.context; 
        const { authorsList = [] } = this.context;

        return articlesList.map(article => 
            <ArticlesListItem 
                key={article.id}
                article={article}
                authors={authorsList}
            />
        );
    }

    render() {
        const { error } = this.context;
        // console.log('mainpage context', this.context);
        return (
            <section className="main-page-articles">
                <h2>Stories</h2>
                {error
                    ? <p className='error' >There was an error try again</p>
                    : this.renderArticles()
                }
            </section>
        );
    }
}

export default MainPage;