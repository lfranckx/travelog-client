import React, { Component } from 'react';
import AuthApiService from '../../Services/auth-api-service'
import ArticleContext from '../../Contexts/ArticleContext';

export default class SignUpForm extends Component {
    static defaultProps = {
        onSubmitSuccess: () => {}
    }

    static contextType = ArticleContext;

    state = { error: null };

    handleSubmit = ev => {
        ev.preventDefault();
        const { email, username, password, first_name, last_name } = ev.target;
        this.setState({ error: null });
        const newUser = {
            email: email.value,
            username: username.value,
            password: password.value,
            first_name: first_name.value,
            last_name: last_name.value
        }
        console.log(newUser);
        AuthApiService.postUser(newUser)
        .then(res => {
            AuthApiService.postLogin({
                username: username.value,
                password: password.value,
            })
            .then(user => {
                username.value = ''
                password.value = ''
                this.props.onSubmitSuccess()
            })
        })
        .catch(res => {
            this.setState({ error: res.error })
        });
    }

    render() {
        const { error } = this.state;
        return (
            <form
                className="auth-form"
                onSubmit={this.handleSubmit}
            >
                <div role='alert'>{error && <p className='error'>{error}</p>}</div>
                <div className="input-box">
                    <label>Email</label>
                    <input
                        type="text" 
                        name='email' 
                        aria-label='email'
                        className='email' 
                        required
                    />
                </div>
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
                        type="text" 
                        name='password' 
                        aria-label='password'
                        className='password' 
                        required
                    />
                </div>
                <div className="input-box">
                    <label>First Name</label>
                    <input
                        type="text" 
                        name='first_name' 
                        aria-label='first_name'
                        className='first_name' 
                        required
                    />
                </div>
                <div className="input-box">
                    <label>Last Name</label>
                    <input
                        type="text" 
                        name='last_name' 
                        aria-label='last_name'
                        className='last_name' 
                        required
                    />
                </div>
                <button type="submit">Register</button>
            </form>
        );
    }
}