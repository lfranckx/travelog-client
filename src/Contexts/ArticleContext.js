/*eslint semi: ["error", "always"]*/
import React, { Component } from 'react';

export const nullArticle = {
    author: {},
    tags: [],
};
export const nullAuthor = {};
export const nullUser = {};
export const nullUsersArticles = [];

const ArticleContext = React.createContext({
    error: null,
    article: nullArticle,
    author: nullAuthor,
    user: nullUser,
    articlesList: [],
    authorsList: [],
    usersArticles: nullUsersArticles,
    setError: () => {},
    clearError: () => {},
    setArticle: () => {},
    clearArticle: () => {},
    setAuthor: () => {},
    clearAuthor: () => {},
    setUser: () => {},
    clearUser: () => {},
    setArticlesList: () => {},
    setAuthorsList: () => {},
    setUsersArticles: () => {},
    clearUsersArticles: () => {}
});
export default ArticleContext;

export class ArticleProvider extends Component {
    state = {
        error: null,
        article: nullArticle,
        author: nullAuthor,
        user: nullUser,
        articlesList: [],
        authorsList: [],
        usersArticles: []
    };

    setError = error => {
        console.error(error);
        this.setState({ error });
    };

    clearError = () => {
        this.setState({ error: null });
    };

    setArticle = article => {
        this.setState({ article });
    };

    clearArticle = () => {
        this.setArticle(nullArticle);
    };

    setAuthor = author => {
        this.setState({ author });
    };

    clearAuthor = () => {
        this.setAuthor(nullAuthor);
    };

    setUser = user => {
        console.log('setting user:', user);
        this.setState({ user });
    };

    clearUser = () => {
        this.setState(nullUser);
    };

    setArticlesList = articlesList => {
        this.setState({ articlesList });
    };

    setAuthorsList = authorsList => {
        this.setState({ authorsList });
    };

    setUsersArticles = usersArticles => {
        this.setState({ usersArticles });
    };

    clearUsersArticles = () => {
        this.setUsersArticles(nullUsersArticles);
    };

    render() {
        const value = {
            error: this.state.error,
            article: this.state.article,
            author: this.state.author,
            user: this.state.user,
            articlesList: this.state.articlesList,
            authorsList: this.state.authorsList,
            usersArticles: this.state.usersArticles,
            setError: this.setError,
            clearError: this.clearError,
            setArticle: this.setArticle,
            clearArticle: this.clearArticle,
            setAuthor: this.setAuthor,
            clearAuthor: this.clearAuthor,
            setUser: this.setUser,
            clearUser: this.clearUser,
            setArticlesList: this.setArticlesList,
            setAuthorsList: this.setAuthorsList,
            setUsersArticles: this.setUsersArticles,
            clearUsersArticles: this.clearUsersArticles
        };
        
        return (
            <ArticleContext.Provider value={value}>
                {this.props.children}
            </ArticleContext.Provider>
        );
    }   
}