import React, { Component } from 'react';
import './EditProfilePage.css';
import EditProfileForm from '../../Components/EditProfileForm/EditProfileForm';
import ArticleContext from '../../Contexts/ArticleContext';


export default class EditProfilePage extends Component {  
    static defaultProps = {
        location: {},
        history: {
            push: () => {}
        },
        match: { params: {} }
    }

    static contextType = ArticleContext;

    handleSubmitForm = () => {
        const { user } = this.context;
        const { location, history } = this.props;
        const destination = (location.state || {}).from || `/profile/${user.username}`
        history.push(destination)    
    }

    render() {       
        return (
            <section className="edit-profile-section">
                <h2>Edit Profile</h2>
                <EditProfileForm 
                    onSubmitForm={this.handleSubmitForm}
                />
            </section>
        )
    }
}