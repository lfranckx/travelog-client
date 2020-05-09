/*eslint semi: ["error", "always"]*/
import React, { Component } from 'react';
import SignUpForm from '../../Components/SignUpForm/SignUpForm';
import './SignUpPage.css';

export default class SignUpPage extends Component {
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
                <section className="sign-up-section">
                    <h2>Sign Up</h2>
                    <SignUpForm 
                        onSubmitSuccess={this.handleSubmitSuccess}
                    />
                </section>
            </>
        );
    }
}