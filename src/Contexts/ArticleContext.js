/*eslint semi: ["error", "always"]*/
import React, { Component } from 'react';

export const nullArticle = {
    author: {},
    tags: [],
};

export const nullAuthor = {};

const ArticleContext = React.createContext({
    error: null,
    article: nullArticle,
    author: nullAuthor,
    articlesList: [],
    authorsList: [],
    usersArticles: [],
    setError: () => {},
    clearError: () => {},
    setArticle: () => {},
    clearArticle: () => {},
    setAuthor: () => {},
    clearAuthor: () => {},
    setArticlesList: () => {},
    setAuthorsList: () => {},
    setUsersArticles: () => {}
});
export default ArticleContext;

export class ArticleProvider extends Component {
    state = {
        error: null,
        article: nullArticle,
        author: nullAuthor,
        articlesList: [],
        authorsList: [],
        usersArticles: []
    };

    setError = error => {
        console.error(error);
        this.setState({ error });
    }

    clearError = () => {
        this.setState({ error: null });
    }

    setArticle = article => {
        this.setState({ article });
    }

    clearArticle = () => {
        this.setArticle(nullArticle);
    }

    setAuthor = author => {
        this.setState({ author });
    }

    clearAuthor = () => {
        this.setAuthor(nullAuthor);
    }
    
    setArticlesList = articlesList => {
        this.setState({ articlesList });
    }

    setAuthorsList = authorsList => {
        this.setState({ authorsList });
    }

    setUsersArticles = usersArticles => {
        this.setState({ usersArticles });
    }

    render() {
        const value = {
            error: this.state.error,
            article: this.state.article,
            author: this.state.author,
            articlesList: this.state.articlesList,
            authorsList: this.state.authorsList,
            usersArticles: this.state.usersArticles,
            setError: this.setError,
            clearError: this.clearError,
            setArticle: this.setArticle,
            clearArticle: this.clearArticle,
            setAuthor: this.setAuthor,
            clearAuthor: this.clearAuthor,
            setArticlesList: this.setArticlesList,
            setAuthorsList: this.setAuthorsList,
            setUsersArticles: this.setUsersArticles
        };
        
        return (
            <ArticleContext.Provider value={value}>
                {this.props.children}
            </ArticleContext.Provider>
        );
    }   
}