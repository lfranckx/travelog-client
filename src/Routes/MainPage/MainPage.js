import React, { Component } from 'react';
import ArticlesListItem from '../../Components/ArticlesListItem/ArticlesListItem';
import ArticleContext from '../../Contexts/ArticleContext';
import ArticleApiService from '../../Services/article-api-service';
import './MainPage.css';

class MainPage extends Component {
    static contextType = ArticleContext;

    componentDidMount() {
        this.context.clearError();
        ArticleApiService.getArticles()
            .then(this.context.setArticlesList)
            .catch(this.context.setError);
        // ArticleApiService.getByUserId()
        //     .then(res => {
        //         this.context.setUsersArticles(res);
        //     })
        //     .catch(this.context.setError);
    }

    renderArticles() {
        const { articlesList = [] } = this.context;
        if (!articlesList) {
            return <div className="loading">Loading...</div>;        
        }

        return articlesList.map(article => 
            <ArticlesListItem 
                key={article.id}
                article={article}
            />
        );
    }

    render() {
        const { error } = this.context;
        console.log('mainpage context', this.context);
        return (
            <section>
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