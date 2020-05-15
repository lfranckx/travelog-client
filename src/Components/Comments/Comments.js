import React, { Component } from 'react';
import './Comments.css';
import ArticleContext from '../../Contexts/ArticleContext';
import ArticleApiService from '../../Services/article-api-service';
import trash from '../../icons/trash.png';

export default class Comments extends Component {
    static contextType = ArticleContext;

    handleSubmit = ev => {
        ev.preventDefault();
        const { article } = this.props;
        const { user } = this.context;
        const { comment } = ev.target;
        const newComment = {
            comment: comment.value,
            username: user.username,
            author_name: user.name,
            article_id: article.id
        };

        ArticleApiService.postComment(newComment)
            .then(this.context.addComment)
            .then(() => {
                comment.value = ''
            })
            .catch(this.context.setError);
    } 

    render() {
        const { comments } = this.props;
        return (
            <section className="comments-section">
                <form className="comment-form"
                    onSubmit={this.handleSubmit}>
                    <div>
                        <textarea rows="5"
                            name="comment"
                            aria-label="comment"
                            className="comment"
                            placeholder="Leave a comment"
                            required
                        >
                        </textarea>
                    </div>
                    <button type="submit">Post</button>
                </form>
                <ArticleComments comments={comments} /> 
            </section>
        )
    }
}

function ArticleComments({ comments = []}) {
    return (
        <ul className="comments-list">
            {comments.map(comment =>
                <li key={comment.id} className="comment">
                    <p className="comment-text">{comment.comment}</p>
                    <p className="comment-user">{comment.username}</p>
                </li>
            )}
        </ul>
    );
}
