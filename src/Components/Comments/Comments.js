import React, { Component } from 'react';
import './Comments.css';
import ArticleContext from '../../Contexts/ArticleContext';
import ArticleApiService from '../../Services/article-api-service';
import TokenService from '../../Services/token-service';
import { Link } from 'react-router-dom';

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
            profile_image: user.profile_image,
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
        if (TokenService.hasAuthToken()) {
            return (
                <section className="comments-section">
                    <ArticleComments comments={comments} /> 
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
                        <button className="post"
                            type="submit">Post</button>
                    </form>
                </section>
            )
        }
        return <ArticleComments comments={comments} />
    }
}

function ArticleComments({ comments = []}) {
    return (
        <section className="comments-section">
            <ul className="comments-list">
                {comments.map(comment =>
                    <li key={comment.id} className="comment">
                        <Link to={`/author/${comment.username}`}>
                            <img className="comment-profile"
                                src={comment.profile_image} 
                                alt="profile" />
                            <p className="comment-user">{comment.author_name}</p>
                        </Link>
                        <p className="comment-text">{comment.comment}</p>
                    </li>
                )}
            </ul>
        </section>
    );
}