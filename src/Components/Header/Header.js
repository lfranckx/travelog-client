/*eslint semi: ["error", "always"]*/
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
            <>
                <header>
                    <div className="header-container">
                        <Link to="/"><h1>Travelog</h1></Link>
                    </div>
                    <div className="header-container">
                        <label className="hidden">search</label>
                        <button type="submit" name="search-button" id="search-button">
                            <i class="fa fa-search"></i>
                        </button>                        
                        <input type="text" />
                        <Link 
                            onClick={this.handleLogOut}
                            to="/">
                            Log Out
                        </Link>
                    </div>
                </header>
            </>
        );
    }

    renderLoginLink() {
        return (
            <header>
                <div className="header-container">
                    <Link to="/"><h1>Travelog</h1></Link>
                </div>
                    <div className="header-container">
                        <label className="hidden">search</label>
                        <button type="submit" name="search-button" id="search-button">
                            <i className="fa fa-search"></i>
                        </button>
                        <input type="text" />
                        <Link 
                            to="/login">
                            Login
                        </Link>
                        <Link 
                            to="/register">
                            Sign Up
                        </Link>
                    </div>
            </header>
        );
    }

    render() {
        return (
            <>
                {TokenService.hasAuthToken()
                    ? this.renderLogoutLink()
                    : this.renderLoginLink()}
            </>
        );
    }
}