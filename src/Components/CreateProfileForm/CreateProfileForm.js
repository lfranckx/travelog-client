import React, { Component } from 'react';
import ArticleContext from '../../Contexts/ArticleContext';
import AuthorApiService from '../../Services/author-api-service';

export default class CreateProfileForm extends Component {

    static contextType = ArticleContext;

    constructor(props) {
        super(props);
        this.fileInput = React.createRef();
        this.state = {
            error: null,
            fileSelected: null
        };
    }

    handleCreateProfile = ev => {
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
            .then(this.context.setUser(author))
            .then(res => {
                if (fileSelected) {
                    AuthorApiService.uploadFile(data)
                        .then(res => {
                            (!res.ok) ? res.json().then(e => Promise.reject(e))
                                : res.json()
                            .then(data => {
                                author.profile_image = data.image_url;
                                AuthorApiService.updateAuthor(author)
                                .then(this.context.setUser(author))
                                .then(this.props.onSubmitForm)
                                .catch(this.context.setError);
                            })
                        });
                }
            })
            .then(this.props.onSubmitForm)
            .catch(this.context.setError);

        // if (fileSelected) {
        //     AuthorApiService.uploadFile(data)
        //         .then(res => {
        //             (!res.ok) ? res.json().then(e => Promise.reject(e))
        //                 : res.json()
        //             .then(data => {
        //                 user.profile_image = data.image_url;
        //                 AuthorApiService.updateAuthor(user)
        //                 .then(this.context.setUser(user))
        //                 .then(this.props.onSubmitForm)
        //                 .catch(this.context.setError);
        //             })
        //         });
        // } else if (!fileSelected) {
            // AuthorApiService.updateAuthor(author)
            //     .then(this.context.setUser(author))
                // .then(this.props.onSubmitForm)
                // .catch(this.context.setError);
        // }
    }

    render() {
        const { error } = this.state;
        const { user } = this.context;
        return (
            <form className="edit-profile-form" onSubmit={this.handleCreateProfile}>
                <div role='alert'>{error && <p className='error'>{error}</p>}</div>
                <div>
                    <label>Select a profile image</label>
                </div>
                <div>
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
                    <input className='name'
                        type='text'
                        name='name'
                        aria-label='name'
                        required
                        defaultValue={user.name}
                    />
                </div>
                <div>
                    <label>About</label>
                </div>
                <div>
                    <textarea
                        rows='18'
                        name='about'
                        aria-label='about'
                    />
                </div>
                <div className="form-button">
                    <button type='submit'>Submit</button>
                </div>
            </form>
        );
    }
}