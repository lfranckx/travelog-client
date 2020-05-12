import React, { Component } from 'react';
import './ProfilePage.css';
import ArticleContext from '../../Contexts/ArticleContext'; 
// import AuthorApiService from '../../Services/author-api-service';
import ArticleApiService from '../../Services/article-api-service';
import AuthorsListItem from '../../Components/AuthorsListItem/AuthorsListItem';

export default class ProfilePage extends Component {

    static contextType = ArticleContext;

    componentDidMount() {
        this.context.clearError();
        const { user } = this.context;
        if (user.length !== 0) {
            ArticleApiService.getByUserId(
                this.context.user.user_id
            )
                .then(this.context.setUsersArticles)
                .catch(this.context.clearError);
        }        
    }

    componentWillUnmount() {
        this.context.clearAuthor();
        this.context.clearUsersArticles();
    }

    render() {
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
                    <p>{user.about}</p>
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