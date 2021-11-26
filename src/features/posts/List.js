import { Link } from 'react-router-dom';
import css from './List.module.css';

export default function List({ posts }) {
  console.log(posts);
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
          <span> 👍</span>
          <span> 👎</span>
          <p> Author: {author}</p>
          <p>
            Category: <Link to={`/${category}`}>{category}</Link>
          </p>
        </div>
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
