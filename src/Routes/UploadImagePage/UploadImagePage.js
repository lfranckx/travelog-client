import React, { Component } from 'react';
import './UploadImagePage.css';
import UploadImageForm from '../../Components/UploadImageForm/UploadImageForm';
import ArticleApiService from '../../Services/article-api-service';
import ArticleContext from '../../Contexts/ArticleContext';

export default class UploadImagePage extends Component {
    static defaultProps = {
        match: { params: {} },
        location: {},
        history: {
          push: () => {},
        },
    }

    static contextType = ArticleContext;

    componentDidMount() {
        this.context.clearError();
        const articleId = this.props.match.params.articleId;
        ArticleApiService.getArticle(articleId)
            .then(this.context.setArticle)
            .catch(this.context.setError)
    }

    handleUploadSuccess = () => {
        const { article } = this.context;
        const { location, history } = this.props;
        const destination = (location.state || {}).from || `/article/${article.id}`;
        history.push(destination);
    }

    render() {
        const { article } = this.context;
        return (
            <section>
                <h2 id="upload-header">Upload an image</h2>
                    <UploadImageForm 
                        onUploadSuccess={this.handleUploadSuccess}
                        article={article}    
                    />
            </section>        
        )
    }
}