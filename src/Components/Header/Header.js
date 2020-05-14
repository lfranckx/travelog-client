import React, { Component } from 'react';
import './Header.css';
import TokenService from '../../Services/token-service';
import IdleService from '../../Services/idle-service';
import { Link } from 'react-router-dom';
import ArticleContext from '../../Contexts/ArticleContext';
// import AuthorApiService from '../../Services/author-api-service';

export default class Header extends Component {
    static contextType = ArticleContext;

    handleLogOut = () => {
        TokenService.clearAuthToken();
        TokenService.clearCallbackBeforeExpiry();
        IdleService.unRegisterIdleResets();
    }

    renderLogOutLink() {
        const { user } = this.context;
        return (
            <>
                <Link to={`/profile/${user.username}`}>
                    Profile
                </Link>
                <Link to="/post">
                    Post
                </Link>
                <Link 
                    onClick={this.handleLogOut}
                    to="/">
                    Logout
                </Link>
            </>
        );
    }

    renderLoginLink() {
        return (
            <>
                <Link to="/login">
                    Login
                </Link>
                <Link 
                    to="/register">
                    Register
                </Link>
            </>
        );
    }

    render() {
        return (
            <header>
                <nav>
                    <div className="header-container">
                        <Link to="/"><h1>Travelog</h1></Link>
                    </div>
                    <div className="header-container">
                        <label className="hidden">search</label>
                        <button type="submit" name="search-button" id="search-button">
                            <i className="fa fa-search"></i>
                        </button>                        
                        <input type="text" />
                        {TokenService.hasAuthToken() 
                            ? this.renderLogOutLink()
                            : this.renderLoginLink()}
                    </div>
                </nav>
            </header>
        );
    }
}