import React, { Component } from 'react';
import '../EditProfilePage/EditProfilePage.css';
import CreateProfileForm from '../../Components/CreateProfileForm/CreateProfileForm.js';
import ArticleContext from '../../Contexts/ArticleContext';

export default class CreateProfilePage extends Component {  
    static defaultProps = {
        location: {},
        history: {
            push: () => {}
        },
        match: { params: {} }
    }

    static contextType = ArticleContext;

    handleSubmitForm = () => {
        const { location, history } = this.props;
        const destination = (location.state || {}).from || `/`;
        history.push(destination);
    }
    
    render() {       
        return (
            <section className="edit-profile-section">
                <h2>Create a profile</h2>
                <CreateProfileForm 
                    onSubmitForm={this.handleSubmitForm}
                />
            </section>
        )
    }
}