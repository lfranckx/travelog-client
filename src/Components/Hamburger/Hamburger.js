import React, { Component } from 'react';
import './Hamburger.css';
import { Link } from 'react-router-dom';
import ArticleContext from '../../Contexts/ArticleContext';
import TokenService from '../../Services/token-service';
import IdleService from '../../Services/idle-service';


export default class Hamburger extends Component {
    static contextType = ArticleContext;

    handleLogOut = () => {        
        this.context.toggleActive();
        TokenService.clearAuthToken();
        TokenService.clearCallbackBeforeExpiry();
        IdleService.unRegisterIdleResets();
    }

    render() {
        const active = this.context.active;
        const { user } = this.props;
        const hamburgerMenu = (active) => (
            <div className={`menu-wrap`}>
                <div className={`toggler ${active ? "active" : ""}`}
                    onClick={() => {this.context.toggleActive()}}/>
                <div className="hamburger"><div></div></div>
                <div className={`menu`}>
                    <div>
                        <div>
                            <ul>
                                <li>
                                    <Link to='/' 
                                        onClick={() => {this.context.toggleActive()}}>
                                        Home
                                    </Link>
                                </li>
                                <li>
                                    <Link to="/post"
                                        onClick={() => {this.context.toggleActive()}}>
                                        Post Article
                                    </Link>
                                </li>
                                <li>
                                    <Link to={`/profile/${user.username}`}
                                        onClick={() => {this.context.toggleActive()}}>
                                        Profile
                                    </Link>
                                </li>
                                <li>
                                    <Link to="/"
                                        onClick={this.handleLogOut}>
                                        Logout
                                    </Link>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        )
        return hamburgerMenu(active)
    }
}