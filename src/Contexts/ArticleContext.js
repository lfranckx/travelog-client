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
    comments: [],
    articlesList: [],
    authorsList: [],
    usersArticles: nullUsersArticles,
    active: false,
    setError: () => {},
    clearError: () => {},
    setArticle: () => {},
    clearArticle: () => {},
    setAuthor: () => {},
    clearAuthor: () => {},
    setUser: () => {},
    clearUser: () => {},
    setComments: () => {},
    addComment: () => {},
    setArticlesList: () => {},
    setAuthorsList: () => {},
    setUsersArticles: () => {},
    clearUsersArticles: () => {},
    updateSearch: () => {},
    toggleActive: () => {},
});
export default ArticleContext;

export class ArticleProvider extends Component {
    state = {
        error: null,
        search: '',
        article: nullArticle,
        author: nullAuthor,
        user: nullUser,
        comments: [],
        articlesList: [],
        authorsList: [],
        usersArticles: [],
        active: false
    };

    setError = error => {
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
        this.setState({ user });
    };

    clearUser = () => {
        this.setState(nullUser);
    };

    setComments = comments => {
        this.setState({ comments: comments });
    };

    addComment = comment => {
        this.setComments([
            ...this.state.comments,
            comment
        ]);
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

    updateSearch = ev => {
        this.setState({ search: ev.target.value.substr(0, 20) });
    };

    toggleActive = () => {
        this.setState({ active: !this.state.active });
    };

    render() {
        const value = {
            error: this.state.error,
            search: this.state.search,
            article: this.state.article,
            author: this.state.author,
            user: this.state.user,
            comments: this.state.comments,
            articlesList: this.state.articlesList,
            authorsList: this.state.authorsList,
            usersArticles: this.state.usersArticles,
            active: this.state.active,
            setError: this.setError,
            clearError: this.clearError,
            setArticle: this.setArticle,
            clearArticle: this.clearArticle,
            setAuthor: this.setAuthor,
            clearAuthor: this.clearAuthor,
            setUser: this.setUser,
            clearUser: this.clearUser,
            setComments: this.setComments,
            addComment: this.addComment,
            setArticlesList: this.setArticlesList,
            setAuthorsList: this.setAuthorsList,
            setUsersArticles: this.setUsersArticles,
            clearUsersArticles: this.clearUsersArticles,
            updateSearch: this.updateSearch,
            toggleActive: this.toggleActive
        };
        
        return (
            <ArticleContext.Provider value={value}>
                {this.props.children}
            </ArticleContext.Provider>
        );
    }   
}