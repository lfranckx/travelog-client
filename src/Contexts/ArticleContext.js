import React, { Component } from 'react';

export const nullArticle = {};
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
    clearUsersArticles: () => {},
    updateSearch: () => {}
});
export default ArticleContext;

export class ArticleProvider extends Component {
    state = {
        error: null,
        search: '',
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
        console.log('clearing error');
        this.setState({ error: null });
    };

    setArticle = article => {
        console.log('setting article', article);
        this.setState({ article });
    };

    clearArticle = () => {
        console.log('clearing article');
        this.setArticle(nullArticle);
    };

    setAuthor = author => {
        console.log('setting author', author);
        this.setState({ author });
    };

    clearAuthor = () => {
        console.log('clearing author');
        this.setAuthor(nullAuthor);
    };

    setUser = user => {
        console.log('setting user:', user);
        this.setState({ user });
    };

    clearUser = () => {
        console.log('clearing user');
        
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
        console.log('clearing usersArticles');
        this.setUsersArticles(nullUsersArticles);
    };

    updateSearch = ev => {
        this.setState({ search: ev.target.value.substr(0, 20) });
    };

    render() {
        const value = {
            error: this.state.error,
            search: this.state.search,
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
            clearUsersArticles: this.clearUsersArticles,
            updateSearch: this.updateSearch
        };
        
        return (
            <ArticleContext.Provider value={value}>
                {this.props.children}
            </ArticleContext.Provider>
        );
    }   
}