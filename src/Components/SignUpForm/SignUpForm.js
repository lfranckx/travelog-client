/*eslint semi: ["error", "always"]*/
import React, { Component } from 'react';
import ArticleContext from '../../Contexts/ArticleContext';

export default class SignUpForm extends Component {
    static defaultProps = {
        onSubmitSuccess: () => {}
    }

    static contextType = ArticleContext;

    state = { error: null };

    render() {
        const { error } = this.state;
        return (
            <form
                className="auth-form"
                onSubmit={this.handleSubmitJwtAuth}
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
                        name='first-name' 
                        aria-label='first-name'
                        className='first-name' 
                        required
                    />
                </div>
                <div className="input-box">
                    <label>Last Name</label>
                    <input
                        type="text" 
                        name='last-name' 
                        aria-label='last-name'
                        className='last-name' 
                        required
                    />
                </div>
            </form>
        );
    }
}