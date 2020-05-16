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
    menuOpen: false,
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
    toggleMenuOpen: () => {},
    toggleMenuClose: () => {}
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
        menuOpen: false
    };

    setError = error => {
        console.error(error);
        this.setState({ error });
    };

    clearError = () => {
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

    setComments = comments => {
        console.log('setting comments', comments);
        this.setState({ comments: comments });
    };

    addComment = comment => {
        console.log('adding comment', comment);
        
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
        console.log('clearing usersArticles');
        this.setUsersArticles(nullUsersArticles);
    };

    updateSearch = ev => {
        this.setState({ search: ev.target.value.substr(0, 20) });
    };

    toggleMenuOpen = () => {
        this.setState({ menuOpen: true});
    };

    toggleMenuClose = () => {
        this.setState({ menuOpen: false});
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
            menuOpen: this.state.menuOpen,
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
            toggleMenuOpen: this.toggleMenuOpen,
            toggleMenuClose: this.toggleMenuClose
        };
        
        return (
            <ArticleContext.Provider value={value}>
                {this.props.children}
            </ArticleContext.Provider>
        );
    }   
}