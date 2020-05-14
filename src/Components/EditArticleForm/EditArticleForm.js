import React, { Component } from 'react';
import ArticleContext from '../../Contexts/ArticleContext';
import ArticleApiService from '../../Services/article-api-service';

export default class EditArticleForm extends Component {
    static defaultProps = {
        onSubmitForm: () => {},
        match: { params: {} }
    }
    
    static contextType = ArticleContext;

    constructor(props) {
        super(props);
        this.fileInput = React.createRef();
        this.state = {
            error: null,
            fileSelected: null
        };
    }

    handleSubmitPost = ev => {
        ev.preventDefault();
        this.setState({ error: null });
        const { article } = this.props;
        const { user } = this.context;        
        const { title, description, body } = ev.target;
        const articleToUpdate = {
            id: article.id,
            title: title.value,
            description: description.value,
            body: body.value,
            author: user.name,
            username: user.username,
            profile_image: user.profile_image
        }

        const fileSelected = this.fileInput.current.files[0];
        let data = new FormData();
        data.append('image', fileSelected);

        ArticleApiService.updateArticle(articleToUpdate)
        .then(res => {
            this.context.setArticle(articleToUpdate);
            if (fileSelected) {
                ArticleApiService.uploadFile(data)
                .then(res => {
                    (!res.ok)
                        ? res.json().then(e => Promise.reject(e))
                        : res.json()
                    .then(data => {
                        article.image_url = data.image_url;
                        ArticleApiService.updateArticle(article)
                        .then(this.context.setArticle(article))
                        .then(
                            ArticleApiService.getByUsername(user.username)
                            .then(this.context.setUsersArticles)
                        )
                        .catch(this.context.setError);
                    })
                })
            }
        })
        .then(this.props.onSubmitForm())
        .catch(this.context.setError);
    }

    render() {
        const { error } = this.state;
        const { article } = this.props;
        return (
            <form
                className="post-form"
                onSubmit={this.handleSubmitPost}
            >
                <div>{error && <p className="error">{error}</p>}</div>
                <div>
                    <label>Select an image to upload</label>
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
                    <input
                        type='text'
                        name='title'
                        aria-label='title'
                        className='title'
                        defaultValue={article.title}
                        required
                    />
                </div>
                <div className="description-box">
                    <input
                        type='text'
                        name='description'
                        aria-label='description'
                        className='description'
                        defaultValue={article.description}
                        required
                    />
                </div>
                <div>
                    <textarea 
                        rows='20'
                        name='body'
                        aria-label='body'
                        className='body'
                        defaultValue={article.body}
                        required
                    />
                </div>
                <button type="submit">Publish</button>
            </form>
        )
    }
}