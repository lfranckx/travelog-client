import React, { Component } from 'react';
import './CommentsForm.css';
import ArticleContext from '../../Contexts/ArticleContext';
// import ArticleApiService from '../../Services/article-api-service';

export default class CommentsForm extends Component {
    static contextType = ArticleContext;

    componentDidMount() {
        console.log('comments form mounted');
        
    }

    handleSubmit = ev => {
        ev.preventDefault();
    }

    render() {
        const { article } = this.props;
        console.log('article props', article);
        
        return (
            <form className="comment-form"
                onSubmit={this.handleSubmit}>
                <div>
                    <textarea columns="50"
                        name="comment"
                        aria-label="comment"
                        className="comment"
                        placeholder="leave a comment"
                        required
                    >
                    </textarea>
                </div>
                <button type="submit">Post Comment</button>
            </form>
        )
    }
}
