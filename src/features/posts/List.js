import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import css from './List.module.css';
import deletePost from './thunks/deletePost';
import votePost from './thunks/votePost';

export default function List({ posts }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const vote = (id, direction) => {
    dispatch(
      votePost({
        id,
        option: direction,
      })
    );
  };

  const Post = ({ title, voteScore, commentCount, category, id, author }) => (
    <li className={css.post}>
      <div className={css.data}>
        <span className={css.score}>
          <h4>
            <i className="far fa-heart"></i>
          </h4>
          <h4> {voteScore}</h4>
        </span>
        <span className={css.comments}>
          <h4>
            {' '}
            <i className="far fa-comment"></i>
          </h4>
          <h4> {commentCount}</h4>
        </span>
      </div>
      <div className={css.postInfo}>
        <h2>
          <Link to={`/${category}/${id}`}>{title}</Link>
        </h2>

        <div className={css.actions}>
          <span className={css.voting} onClick={() => vote(id, 'upVote')}>
            <i className="fas fa-thumbs-up"></i>
          </span>
          <span className={css.voting} onClick={() => vote(id, 'downVote')}>
            <i className="fas fa-thumbs-down"></i>
          </span>
          <p> Author: {author}</p>
          <p>
            Category: <Link to={`/${category}`}>{category}</Link>
          </p>
          <button onClick={() => navigate(`/${category}/${id}/edit`)}>
            <i className="fas fa-edit"></i>
          </button>
          <button
            className={css.delete}
            onClick={() => {
              dispatch(deletePost(id));
            }}
          >
            <i className="fas fa-trash-alt"></i>
          </button>
        </div>
      </div>
    </li>
  );
  return (
    <div className={css.posts}>
      <h2>Posts</h2>
      {posts.length > 0 ? (
        <ul>
          {posts.map((post) => (
            <Post key={post.id} {...post} />
          ))}
        </ul>
      ) : (
        <p>No Posts</p>
      )}
    </div>
  );
}
