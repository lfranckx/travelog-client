import React, { Component } from 'react';
import ArticleContext from '../../Contexts/ArticleContext';
import AuthorApiService from '../../Services/author-api-service';

export default class EditProfileForm extends Component {
    static defaultProps = {
        onSubmitForm: () => {},
        match: { params: {} }
    }

    static contextType = ArticleContext;

    constructor(props) {
        super(props)
        this.fileInput = React.createRef();
        this.state = {
            error: null,
            fileSelected: null
        }
    }

    handleUpdateProfile = ev => {
        ev.preventDefault();
        this.setState({ error: null });
        const { name, about } = ev.target;
        const { user } = this.context;
        const author = {
            username: user.username,
            name: name.value,
            about: about.value
        }

        const fileSelected = this.fileInput.current.files[0];
        let data = new FormData();
        data.append('image', fileSelected);

        AuthorApiService.updateAuthor(author)
        .then(res => {
            console.log('setting author', author);
            
            this.context.setUser(author);
            console.log('fileSelected', fileSelected);
            
            if (fileSelected) {
                AuthorApiService.uploadFile(data)
                .then(res => {
                    (!res.ok)
                        ? res.json().then(e => Promise.reject(e))
                        : res.json()
                    .then(data => {
                        console.log('data', data)
                        user.profile_image = data.image_url;
                        console.log('user', user);
                        
                        AuthorApiService.updateAuthor(user)
                            .then(this.context.setUser(user))
                    })
                })
            }
        })
        .then(this.props.onSubmitForm())
        .catch(this.context.setError);
    }

    render() {
        const { error } = this.state;
        const { user } = this.context;
        console.log('editprofile user', user);
        
        return (
            <form className="edit-profile-form" onSubmit={this.handleUpdateProfile}>
                <div role='alert'>{error && <p className='error'>{error}</p>}</div>
                <div>
                    <label>Upload a profile image</label>
                    <input
                        ref={this.fileInput}
                        type="file"
                        accept=".png, .jpg, .jpeg .gif"
                        name="file" 
                        aria-label='file'
                        className="file"
                    />
                </div>
                <div>
                    <label>Full Name</label>
                </div>
                <div>
                    <input
                        type='text'
                        name='name'
                        aria-label='name'
                        defaultValue={user.name}
                        required
                    />
                </div>
                <div>
                    <label>About</label>
                </div>
                <div>
                    <textarea
                        rows='20'
                        name='about'
                        aria-label='about'
                        defaultValue={user.about}
                        required
                    />
                </div>
                <button type='submit'>Submit</button>
            </form>
        )
    }

}