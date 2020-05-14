import React, { Component } from 'react';
import ArticleContext from '../../Contexts/ArticleContext';
import ArticleApiService from '../../Services/article-api-service';

export default class PostArticleForm extends Component {
    static defaultProps = {
        onSubmitSuccess: () => {}
    }

    static contextType = ArticleContext;

    state = {
        error: null
    }

    handleSubmitPost = ev => {
        ev.preventDefault();
        this.setState({ error: null });
        
        const { user } = this.context;        
        const { title, description, body } = ev.target;
        const newArticle = {
            title: title.value,
            description: description.value,
            body: body.value,
            author: user.name,
            username: user.username,
            image_url: "",
            profile_image: user.profile_image
        }
        console.log('newArticle', newArticle);
        
        ArticleApiService.postArticle(newArticle)
            .then(res => {
                ArticleApiService.getArticle(res.id)
                    .then(article => {
                        this.context.clearArticle();
                        this.context.setArticle(article);
                        this.props.onSubmitSuccess();
                    })
            })
    }

    render() {
        const { error } = this.state;
        const { user } = this.context;
        console.log('PostArticleForm user from context', user);
        console.log(user.profile_image);

        return (
            <form
                className="post-form"
                onSubmit={this.handleSubmitPost}
            >
                <div>{error && <p className="error">{error}</p>}</div>
                <div>
                    <input
                        type='text'
                        name='title'
                        aria-label='title'
                        className='title'
                        defaultValue='Title'
                        required
                    />
                </div>
                <div className="description-box">
                    <input
                        type='text'
                        name='description'
                        aria-label='description'
                        className='description'
                        defaultValue='tell a little description...'
                        required
                    />
                </div>
                <div>
                    <textarea 
                        rows='20'
                        name='body'
                        aria-label='body'
                        className='body'
                        defaultValue='tell your story...'
                        required
                    />
                </div>
                <button type="submit">Publish</button>
            </form>
        )
    }
}