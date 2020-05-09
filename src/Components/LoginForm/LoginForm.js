/*eslint semi: ["error", "always"]*/
import React, { Component } from 'react';
import ArticleContext from '../../Contexts/ArticleContext';

export default class LoginForm extends Component {
    static defaultProps = {
        onSubmitSuccess: () => {}
    }

    static contextType = ArticleContext;

    state = { error: null };

    // handleSubmitJwtAuth = ev => {
    //     ev.preventDefault();
    //     this.setState({ error: null });
    //     const { username, password } = ev.target;
    //     AuthApiService.postLogin({
    //         username: username.value,
    //         user_password: password.value,
    //       })
    //       .then(res => {
    //           username.value = '';
    //           password.value = '';
    //           this.props.onSubmitSuccess();
    //       })
    //       .catch(res => {
    //           this.setState({ error: res.error });
    //       });
    // }

    render() {
        const { error } = this.state;
        return (
            <form 
                className="auth-form"
                onSubmit={this.handleSubmitJwtAuth}
            >
                <div role='alert'>{error && <p className='error'>{error}</p>}</div>
                <div className="input-box">
                    <label>Username</label>
                    <input
                        type="text" 
                        name='username' 
                        aria-label='username'
                        className='username' 
                        required
                    />
                </div>
                <div className="input-box">
                    <label>Password</label>
                    <input 
                        autoComplete="on"
                        type="password" 
                        name='password' 
                        aria-label='password'
                        className='password'
                        required />
                </div>
                <button type="submit">Login</button>
            </form>
        );
    }
}