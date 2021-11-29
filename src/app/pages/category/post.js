import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router';
import addPostComment from '../../../features/posts/thunks/addPostComment';
import deletePost from '../../../features/posts/thunks/deletePost';
import deletePostComment from '../../../features/posts/thunks/deletePostComment';
import votePost from '../../../features/posts/thunks/votePost';
import votePostComment from '../../../features/posts/thunks/votePostComment';
import { generateUID } from '../../../utils/uid';

import css from './Post.module.css';
export default function Post() {
  const { postId } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [posts, comments] = useSelector(({ posts }) => [
    posts.list,
    posts.comments[postId],
  ]);
  const [theComments, setTheComment] = useState([]);
  const [thePost, setThePost] = useState({ title: '' });
  const [textarea, setTextarea] = useState('');
  const [commentAuthor, setCommentAuthor] = useState('');

  const MIN_TEXT_AREA = 30;

  useEffect(() => {
    let post = posts.filter((post) => post.id === postId);
    if (post.length > 0) {
      setThePost(post[0]);
      setTheComment(comments);
    }
  }, [posts, postId, comments]);

  const { title, body, author, timestamp, voteScore, commentCount, category } =
    thePost;

  const handleCommentSubmit = (e) => {
    e.preventDefault();
    // Dispatch add comment
    dispatch(
      addPostComment({
        id: generateUID(),
        parentId: postId,
        body: textarea,
        timestamp: new Date().getTime(),
        author: commentAuthor,
      })
    );
    setTextarea('');
    setCommentAuthor('');
  };
  const vote = (id, direction) => {
    dispatch(
      votePost({
        id,
        option: direction,
      })
    );
  };
  const voteComment = (id, direction) => {
    dispatch(
      votePostComment({
        id,
        option: direction,
      })
    );
  };

  const disabled = () =>
    commentAuthor === '' || textarea === '' || textarea.length < MIN_TEXT_AREA;
  return (
    <div className={css.post}>
      <h1> {title}</h1>
      <div className={css.postMeta}>
        <div className={css.left}>
          <p>Author: {author} </p>
          <p>Created: {new Date(timestamp).toLocaleDateString('en-US')}</p>
          <hr />
        </div>
        <div className={css.audience}>
          <button
            onClick={() => {
              navigate(`/${category}/${postId}/edit`);
            }}
          >
            <i className="fas fa-edit"></i>
          </button>
          <button
            className={css.delete}
            onClick={() => {
              dispatch(deletePost(postId));
              navigate('/');
            }}
          >
            <i className="fas fa-trash-alt"></i>
          </button>
          <span className={css.numVote}>
            <p>
              <i className="far fa-heart"></i>
            </p>
            <p>{voteScore}</p>
          </span>
          <span className={css.numComments}>
            <p>
              <i className="far fa-comment"></i>
            </p>
            <p>{commentCount}</p>
          </span>
          <div className={css.vote}>
            <span className={css.voting} onClick={() => vote(postId, 'upVote')}>
              <i className="fas fa-thumbs-up"></i>
            </span>
            <span
              className={css.voting}
              onClick={() => vote(postId, 'downVote')}
            >
              <i className="fas fa-thumbs-down"></i>
            </span>
          </div>
        </div>
      </div>
      <div className={css.body}>
        <p>{body}</p>
      </div>
      {theComments.length > 0 && (
        <div className={css.comments}>
          <h2>Comments</h2>
          <ul>
            {theComments.map((comment) => (
              <li key={comment.id}>
                <div className={css.commentActions}>
                  <p>
                    <i className={css.cAuthor}>{comment.author}</i> wrote:
                  </p>

                  <div className={css.buttons}>
                    <div className={css.commentScore}>
                      <p> {comment.voteScore}</p>
                      <div>
                        <span
                          className={css.voting}
                          onClick={() => voteComment(comment.id, 'upVote')}
                        >
                          <i className="fas fa-thumbs-up"></i>{' '}
                        </span>
                        <span
                          className={css.voting}
                          onClick={() => voteComment(comment.id, 'downVote')}
                        >
                          <i className="fas fa-thumbs-down"></i>
                        </span>
                      </div>
                    </div>
                    <button
                      className={css.delete}
                      onClick={() => {
                        dispatch(deletePostComment(comment.id));
                      }}
                    >
                      <i className="fas fa-trash-alt"></i>
                    </button>
                  </div>
                </div>
                <p>{comment.body}</p>
                <hr />
              </li>
            ))}
          </ul>
        </div>
      )}
      <div className={css.addComment}>
        <h2>Add Comment</h2>
        <form onSubmit={handleCommentSubmit}>
          <input
            type="text"
            value={commentAuthor}
            placeholder="Author"
            onChange={({ target }) => setCommentAuthor(target.value)}
          />
          <textarea
            value={textarea}
            onChange={({ target }) => setTextarea(target.value)}
            placeholder="What are you thoughts?"
          ></textarea>
          <div className={css.addActions}>
            <button type="submit" disabled={disabled()}>
              Add
            </button>
            {textarea.length < MIN_TEXT_AREA && (
              <span>
                <p>Min words: {MIN_TEXT_AREA - textarea.length}</p>
              </span>
            )}
          </div>
        </form>
      </div>
    </div>
  );
}
