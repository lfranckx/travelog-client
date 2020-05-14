import React, { Component } from 'react';
import './Header.css';
import TokenService from '../../Services/token-service';
import IdleService from '../../Services/idle-service';
import { Link } from 'react-router-dom';
import ArticleContext from '../../Contexts/ArticleContext';
import SearchBar from '../Searchbar/Searchbar';

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
                <Link to='/'>Home</Link>
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
                        <Link to="/" >
                            <h1>Travelog</h1>
                        </Link>
                        <SearchBar />
                    </div>
                    <div className="header-container">                     
                        {TokenService.hasAuthToken() 
                            ? this.renderLogOutLink()
                            : this.renderLoginLink()}
                    </div>
                </nav>
            </header>
        );
    }
}