import css from './List.module.css';
export default function List({ posts }) {
  const Post = ({ title }) => <li>{title}</li>;
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
