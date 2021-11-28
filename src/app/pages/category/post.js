import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router';
import { addPostComment } from '../../../features/posts/slice';
import { generateUID } from '../../../utils/uid';
import css from './Post.module.css';
export default function Post() {
  const { postId } = useParams();
  const dispatch = useDispatch();
  const [posts, comments] = useSelector(({ posts }) => [
    posts.list,
    posts.comments[postId],
  ]);

  const [thePost, setThePost] = useState({ title: '' });
  const [textarea, setTextarea] = useState('');
  const [commentAuthor, setCommentAuthor] = useState('');

  useEffect(() => {
    let post = posts.filter((post) => post.id === postId);
    if (post.length > 0) setThePost(post[0]);
  }, [posts, postId]);

  const { title, body, author, timestamp } = thePost;

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
  return (
    <div className={css.post}>
      <h1> {title}</h1>
      <div className={css.postMeta}>
        <div className={css.left}>
          <p>Author: {author}</p>
          <p>Crate: {new Date(timestamp).toLocaleString('en-US')}</p>
          <hr />
        </div>
        <div className={css.right}>
          <p>icons</p>
        </div>
      </div>
      <div className={css.body}>
        <p>{body}</p>
      </div>
      {comments.length > 0 && (
        <div className={css.comments}>
          <h2>Comments</h2>
          <ul>
            {comments.map((comment) => (
              <li key={comment.id}>
                <p>
                  <i className={css.cAuthor}>{comment.author}</i> wrote:
                </p>
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
          <button type="submit">Add</button>
        </form>
      </div>
    </div>
  );
}
