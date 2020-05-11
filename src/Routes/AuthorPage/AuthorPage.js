import React, { Component } from 'react';
import './AuthorPage.css';
import ArticleContext from '../../Contexts/ArticleContext'; 
import AuthorApiService from '../../Services/author-api-service';

export default class AuthorPage extends Component {
    static defaultProps = {
        match: { params: {} },
    }

    static contextType = ArticleContext;

    componentDidMount() {
        const { authorId } = this.props.match.params;
        this.context.clearError();
        AuthorApiService.getAuthor(authorId)
            .then(this.context.setAuthor)
            .catch(this.context.setError);
    }

    componentWillUnmount() {
        this.context.clearAuthor();
    }

    renderAuthor() {
        const { author } = this.context;
        return (
            <section className="author-page">
                <div className="container">
                    <img src={author.profile_image} />
                    <h2>{author.name}</h2>
                </div>
                <div>
                    <p>{author.about}</p>
                </div>
            </section>
        );
    }

    render() {
        const { error, author } = this.context;
        console.log('AuthorPage Context', this.context);
        
        let content;
        if (error) {
            content = (error.error === "Author doesn't exist")
                ? <p className="error">Author not found</p>
                : <p className="error">There was an error</p>;
        } else if(!author.id) {
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