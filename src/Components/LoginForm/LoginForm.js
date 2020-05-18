import React, { Component } from 'react';
import AuthApiService from '../../Services/auth-api-service';
import ArticleContext from '../../Contexts/ArticleContext';

export default class LoginForm extends Component {
    static defaultProps = {
        onSubmitSuccess: () => {}
    }

    static contextType = ArticleContext;

    state = { error: null };

    handleSubmitJwtAuth = ev => {
        ev.preventDefault();
        this.setState({ error: null });
        const { username, password } = ev.target;
        AuthApiService.postLogin({
            username: username.value,
            password: password.value,
          })
        .then(res => {
            username.value = '';
            password.value = '';
            this.props.onSubmitSuccess();
        })
        .catch(res => {
            this.setState({ error: res.error });
        });
    }

    render() {
        const { error } = this.state;
        return (
            <form 
                className="login-form"
                onSubmit={this.handleSubmitJwtAuth}
            >
                <div role='alert'>{error && <p className='error'>{error}</p>}</div>
                <div className="name-input">
                    <label htmlFor="login-user">Username</label>
                    <input
                        type="text" 
                        name='username' 
                        aria-label='username'
                        className='username'
                        id='login-user' 
                        required
                    />
                </div>
                <div className="name-input">
                    <label htmlFor='login-pass'>Password</label>
                    <input 
                        autoComplete="on"
                        type="password" 
                        name='password' 
                        aria-label='password'
                        className='password'
                        id='login-pass'
                        required />
                </div>
                <button className="submit"
                    type="submit">Login</button>
            </form>
        );
    }
}