import React, { Component } from 'react';
import './Header.css';
import TokenService from '../../Services/token-service';
import IdleService from '../../Services/idle-service';
import { Link } from 'react-router-dom';
import ArticleContext from '../../Contexts/ArticleContext';
import SearchBar from '../Searchbar/Searchbar';
import Logo from '../../icons/bootprint.png';
import world from '../../icons/world.png';
import notepad from '../../icons/notepad.png';
import bookmark from '../../icons/bookmark3.png';

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
                <Link to='/' className="nav-link">
                    <img src={world} alt="world" className="world" />
                </Link>
                <Link to="/post" className="nav-link">
                    <img src={notepad} alt="notepad" className="notepad" />
                </Link>
                <Link to={`/bookmarks`}>
                    <img src={bookmark} alt="bookmark" className="bookmark" />
                </Link>
                <Link to={`/profile/${user.username}`}>
                    <img src={user.profile_image} alt="profile" className="profile" />
                </Link>
                <Link to="/" onClick={this.handleLogOut}>
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
                        <Link to="/" className="title-logo">
                            <img src={Logo} alt="footprint" className="logo"/>
                            <h1>Travelog</h1>
                        </Link>
                    </div>
                    <SearchBar />
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