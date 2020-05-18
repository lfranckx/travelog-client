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
        AuthApiService.postUser(newUser)
        .then(res => {
            AuthApiService.postAuthor({
                username: username.value,
                name: first_name.value + ' ' + last_name.value,
                about: "",
                profile_image: ""
            })
            .then(res => {
                this.context.setUser(res);
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
        })
        .catch(res => {
            this.setState({ error: res.error })
        });
    }

    render() {
        const { error } = this.state;
        return (
            <form
                className="sign-up-form"
                onSubmit={this.handleSubmit}
            >
                <div role='alert'>{error && <p className='error'>{error}</p>}</div>
                <div className="name-box">
                    <div className="name-input">
                        <label htmlFor="first-name-in">First Name</label>
                        <input
                            type="text" 
                            name='first_name' 
                            aria-label='first_name'
                            className='first_name' 
                            id='first-name-in'
                            required
                        />
                    </div>
                    <div className="name-input">
                        <label htmlFor='last-name-in'>Last Name</label>
                        <input
                            type="text" 
                            name='last_name' 
                            aria-label='last_name'
                            className='last_name' 
                            id='last-name-in'
                            required
                        />
                    </div>
                </div>
                <div className="name-box">
                    <div className="name-input">
                        <label htmlFor='email-in'>Email</label>
                        <input
                            type="text" 
                            name='email' 
                            aria-label='email'
                            className='email' 
                            id='email-in'
                            required
                        />
                    </div>
                    <div className="name-input">
                        <label htmlFor='user-in'>Username</label>
                        <input
                            type="text" 
                            name='username' 
                            aria-label='username'
                            className='username' 
                            id='user-in'
                            required
                        />
                    </div>
                </div>
                <div className="password-box">
                    <label htmlFor='password-in'>Password</label>
                    <input
                        type="password" 
                        name='password' 
                        aria-label='password'
                        className='password'
                        id='password-in' 
                        required
                    />
                </div>
                <button className="submit register"
                    type="submit">Register</button>
            </form>
        );
    }
}