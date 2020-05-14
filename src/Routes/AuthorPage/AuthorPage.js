import React, { Component } from 'react';
import './AuthorPage.css';
import ArticleContext from '../../Contexts/ArticleContext'; 
import AuthorApiService from '../../Services/author-api-service';
import ArticleApiService from '../../Services/article-api-service';
import AuthorsListItem from '../../Components/AuthorsListItem/AuthorsListItem';


export default class AuthorPage extends Component {
    
    static defaultProps = {
        match: { params: {} }
    }

    static contextType = ArticleContext;

    componentDidMount() {        
        const { username } = this.props.match.params;
        this.context.clearError();
        AuthorApiService.getByUsername(username)
            .then(this.context.setAuthor)
            .catch(this.context.setError);
        ArticleApiService.getByUsername(username)
            .then(this.context.setUsersArticles)
            .catch(this.context.clearError);
    }

    componentWillUnmount() {
        this.context.clearAuthor();
        this.context.clearUsersArticles();
    }

    renderAuthor() {        
        const { author, usersArticles } = this.context;
        return (
            <>
                <section className="author-page">
                    <div className="author-page-container">
                        <img 
                            className="profile-image"
                            src={author.profile_image} 
                            alt="author-profile" />
                        <h2>{author.name}</h2>
                    </div>
                    <p>{author.about}</p>
                </section>
                <section className="authors-articles">
                    {usersArticles.map(article => 
                        <AuthorsListItem 
                            key={article.id}
                            article={article}
                        />
                    )}
                </section>
            </>
        );
    }

    render() {
        console.log('authorPage context', this.context);
        const { error, author } = this.context;        
        let content;
        if (error) {
            content = (error.error === "Author doesn't exist")
                ? <p className="error">Author not found</p>
                : <p className="error">There was an error</p>;
        } else if(!author.username) {
            content = <div className="loading">Loading...</div>;
        } else {
            content = this.renderAuthor();
        }
        return (
            <>
                {content}
            </>
        );
    }
}