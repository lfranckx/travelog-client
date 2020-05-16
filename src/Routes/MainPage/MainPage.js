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
        console.log('component did mount');
        
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

    searchFor(term) {
        return function(x) {
            return x.first.toLowerCase().includes(term.toLowerCase()) || !term;
        };
    }

    renderArticles() {
        const { articlesList, authorsList } = this.context; 
        // sort by date closest to current date
        articlesList.sort(function(a, b) {
            return new Date(b.date) - new Date(a.date);
        });

        // search filter by title
        let filteredList = articlesList.filter(article => {
            return article.title.toLowerCase().indexOf(
                this.context.search.toLowerCase()
            ) !== -1;
        });

        return filteredList.map(article => 
            <ArticlesListItem 
                key={article.id}
                article={article}
                authors={authorsList}
            />
        );
    }

    render() {
        const { error } = this.context;
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