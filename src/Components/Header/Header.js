import React, { Component } from 'react';
import './Header.css';
import TokenService from '../../Services/token-service';
import IdleService from '../../Services/idle-service';
import { Link } from 'react-router-dom';

export default class Header extends Component {
    handleLogOut = () => {
        TokenService.clearAuthToken();
        TokenService.clearCallbackBeforeExpiry();
        IdleService.unRegisterIdleResets();
    }

    renderLogOutLink() {
        return (
            <Link 
                onClick={this.handleLogOut}
                to="/">
                Logout
            </Link>
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
                            ? this.renderLogoutLink()
                            : this.renderLoginLink()}
                    </div>
                </nav>
            </header>
        );
    }
}