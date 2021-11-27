import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useNavigate } from 'react-router-dom';
import { editPost } from '../../../features/posts/slice';

import css from './Edit.module.css';

export default function Edit(props) {
  const { postId } = useParams();
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const [author, setAuthor] = useState('');
  const [theCategory, setTheCategory] = useState('react');
  const categories = useSelector(({ categories }) => categories.list);
  const posts = useSelector(({ posts }) => posts.list);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    const foundedPost = posts.filter((post) => post.id === postId);
    if (foundedPost.length > 0) {
      setTitle(foundedPost[0].title);
      setBody(foundedPost[0].body);
      setAuthor(foundedPost[0].author);
      setTheCategory(foundedPost[0].category);
    }
  }, [posts, postId]);

  const handleForm = (e) => {
    e.preventDefault();

    dispatch(
      editPost({
        id: postId,
        title,
        body,
        author,
        category: theCategory,
      })
    );
    navigate(`/${theCategory}/${postId}`);
  };
  const disabled = () => title === '' || body === '' || author === '';
  return (
    <div className={css.add}>
      <form onSubmit={handleForm}>
        <input
          type="text"
          value={title}
          placeholder="title"
          onChange={({ target }) => setTitle(target.value)}
        />
        <input
          type="text"
          value={body}
          placeholder="body"
          onChange={({ target }) => setBody(target.value)}
        />
        <input
          type="text"
          value={author}
          placeholder="author"
          onChange={({ target }) => setAuthor(target.value)}
        />
        <select
          value={theCategory}
          onChange={({ target }) => setTheCategory(target.value)}
        >
          {categories.map(({ name, path }) => (
            <option key={path} value={name}>
              {name}
            </option>
          ))}
        </select>

        <button disabled={disabled()}> Update </button>
      </form>
    </div>
  );
}
