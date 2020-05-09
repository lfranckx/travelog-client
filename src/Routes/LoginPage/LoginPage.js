/*eslint semi: ["error", "always"]*/
import React, { Component } from 'react';
import LoginForm from '../../Components/LoginForm/LoginForm';
import './LoginPage.css';

export default class LoginPage extends Component {
    static defaultProps = {
        location: {},
        history: {
            push: () => {}
        }
    }

    handleSubmitSuccess = () => {
        const { location, history } = this.props;
        const destination = (location.state || {}).from || '/';
        history.push(destination);
    }

    render() {
        return (
            <>
                <section className="login-section">
                    <h2>Login</h2>
                    <LoginForm 
                        onSubmitSuccess={this.handleSubmitSuccess}
                    />
                </section>
            </>
        );
    }
}