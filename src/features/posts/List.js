import { Link } from 'react-router-dom';
import css from './List.module.css';

export default function List({ posts }) {
  console.log(posts);
  const Post = ({ title, voteScore, commentCount, category, id }) => (
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
      <div>
        <h2>
          <Link to={`/${category}/${id}`}>{title}</Link>
        </h2>
        <p>
          Category: <Link to={`/${category}`}>{category}</Link>
        </p>
      </div>
    </li>
  );
  return (
    <div className={css.posts}>
      <ul>
        {posts.map((post) => (
          <Post key={post.id} {...post} />
        ))}
      </ul>
    </div>
  );
}
