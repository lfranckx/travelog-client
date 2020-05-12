import React, { Component } from 'react';
import ArticleApiService from '../../Services/article-api-service';
import ArticleContext from '../../Contexts/ArticleContext';

export default class UploadImageForm extends Component {
    static defaultProps = {
        onUploadSuccess: () => {}
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

    handleSingleFileUpload = ev => {
        ev.preventDefault();
        this.setState({ error: null });

        const { article } = this.context;        
        const fileSelected = this.fileInput.current.files[0];
        console.log(fileSelected);
        
        let data = new FormData();
        data.append('image', fileSelected)
        console.log(data.get('image'));
        
        ArticleApiService.uploadFile(data)
            .then(res => {
                (!res.ok)
                    ? res.json().then(e => Promise.reject(e))
                    : res.json()
                    .then(data => {
                        article.image_url = data.image_url;
                        ArticleApiService.updateArticle(article);
                        this.props.onUploadSuccess();
                    })
            })
    }

    render() {
        console.log('uploadform context', this.context);
        const { error } = this.state;
        return (
            <form
                className="upload-form"
                onSubmit={this.handleSingleFileUpload}
            >
                <div role='alert'>{error && <p className='error'>{error}</p>}</div>
                <label>Select an image to upload:</label>
                    <input 
                        ref={this.fileInput}
                        type="file"
                        accept=".png, .jpg, .jpeg .gif"
                        name="file" 
                        aria-label='file'
                        className="file" />
                    <button id="upload-button" type="submit">Upload Image</button>
            </form>
        )
    }
}