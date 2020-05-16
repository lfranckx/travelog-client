import React, { Component } from 'react';
import './ProfilePage.css';
import ArticleContext from '../../Contexts/ArticleContext'; 
import AuthorApiService from '../../Services/author-api-service';
import ArticleApiService from '../../Services/article-api-service';
import AuthorsListItem from '../../Components/AuthorsListItem/AuthorsListItem';
import { Link } from 'react-router-dom';

export default class ProfilePage extends Component {

    static defaultProps = {
        match: { params: {} }
    }

    static contextType = ArticleContext;

    componentDidMount() {
        this.context.clearError();
        const { username } = this.props.match.params;
        AuthorApiService.getLoggedInAuthor()
            .then(this.context.setUser)
            .catch(this.context.setError);
        ArticleApiService.getByUsername(username)
            .then(this.context.setUsersArticles)
            .catch(this.context.setError);       
    }

    componentWillUnmount() {
        this.context.clearAuthor();
        this.context.clearUsersArticles();
    }

    render() {
        const { username } = this.props.match.params;
        const { user, usersArticles } = this.context;
        if (user.length === 0) {
            return <div className="loading">Loading...</div>
        }
        return (
            <>
                <section className="profile-page">
                    <div className="profile-page-container">
                        <img 
                            className="profile-image"
                            src={user.profile_image} 
                            alt="author-profile" />
                        <h2>{user.name}</h2>
                    </div>
                    <p className="profile-about">{user.about}</p>
                    <Link to={`/editprofile/${username}`}>Edit Profile</Link>
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
}