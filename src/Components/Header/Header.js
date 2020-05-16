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
import profile from '../../icons/profile.png';

export default class Header extends Component {
    static contextType = ArticleContext;

    handleLogOut = () => {
        TokenService.clearAuthToken();
        TokenService.clearCallbackBeforeExpiry();
        IdleService.unRegisterIdleResets();
    }

    renderLogOutLink() {
        const { user } = this.context;
        if (!user.profile_image) {
            user.profile_image = profile;
        }
        return (
            <>
                <Link to='/' className="nav-link">
                    <img src={world} alt="world" className="world icon" />
                    <div>Home</div>
                </Link>
                <Link to="/post" className="nav-link">
                    <img src={notepad} alt="notepad" className="notepad icon" />
                    <div className="post-text">Post</div>
                </Link>
                <Link to={`/profile/${user.username}`} className="nav-link">
                    <img src={user.profile_image} alt="profile" className="profile icon" />
                </Link>
                <Link to="/" 
                    className="logout"
                    onClick={this.handleLogOut}>
                    Logout
                </Link>
                <div className="menu-wrap">
                    <input type="checkbox" className="toggler"/>
                    <div className="hamburger"><div></div></div>
                    <div className="menu">
                        <div>
                            <div>
                                <ul>
                                    <li>
                                        <Link to='/'>
                                            Home
                                        </Link>
                                    </li>
                                    <li>
                                        <Link to="/post">
                                            Post Article
                                        </Link>
                                    </li>
                                    <li>
                                        <Link to={`/profile/${user.username}`}>
                                            Profile
                                        </Link>
                                    </li>
                                    <li>
                                        <Link to="/" onClick={this.handleLogOut}>
                                            Logout
                                        </Link>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </>
        );
    }

    renderLoginLink() {
        return (
            <>
                <Link to="/login"
                    className="login">
                    Log In
                </Link>
                <Link to="/register"
                    className="register">
                    Join
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