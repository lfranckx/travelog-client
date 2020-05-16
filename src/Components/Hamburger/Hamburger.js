import React, { Component } from 'react';
import './Hamburger.css';
import { Link } from 'react-router-dom';


export default class Hamburger extends Component {
    render() {
        const { user } = this.props;
        return (
            <div className="menu-wrap" id="hamburger">
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
                                        <Link to="/">
                                            Logout
                                        </Link>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
        )
    }
}