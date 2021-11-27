import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import css from './List.module.css';
import { votePost } from './slice';

export default function List({ posts }) {
  const dispatch = useDispatch();
  const upVote = (id) => {
    dispatch(
      votePost({
        id,
        option: 'upVote',
      })
    );
  };
  const downVote = (id) => {
    dispatch(
      votePost({
        id,
        option: 'downVote',
      })
    );
  };
  const edit = () => {
    console.log('edit me');
  };
  const Post = ({ title, voteScore, commentCount, category, id, author }) => (
    <li className={css.post}>
      <div className={css.data}>
        <span className={css.score}>
          <h4>Score</h4>
          <h4> {voteScore}</h4>
        </span>
        <span className={css.comments}>
          <h4>Comments</h4>
          <h4> {commentCount}</h4>
        </span>
      </div>
      <div className={css.postInfo}>
        <h2>
          <Link to={`/${category}/${id}`}>{title}</Link>
        </h2>

        <div className={css.actions}>
          <span className={css.voting} onClick={() => upVote(id)}>
            👍
          </span>
          <span className={css.voting} onClick={() => downVote(id)}>
            👎
          </span>
          <p> Author: {author}</p>
          <p>
            Category: <Link to={`/${category}`}>{category}</Link>
          </p>
          <button onClick={edit}>Edit</button>
        </div>
      </div>
    </li>
  );
  return (
    <div className={css.posts}>
      <h2 className={css.title}>Posts</h2>
      <ul>{posts.map((post) => <Post key={post.id} {...post} />).reverse()}</ul>
    </div>
  );
}
