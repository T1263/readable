import { useState } from 'react';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router';
import { addPost } from '../../../features/posts/slice';
import { generateUID } from '../../../utils/uid';

import css from './Add.module.css';
export default function Add() {
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const [author, setAuthor] = useState('');
  const [category, setCategory] = useState('react');
  const categories = useSelector(({ categories }) => categories.list);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleForm = (e) => {
    e.preventDefault();

    dispatch(
      addPost({
        id: generateUID(),
        timestamp: new Date().getTime(),
        title,
        body,
        author,
        category,
      })
    );
    navigate('/');
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
          value={category}
          onChange={({ target }) => setCategory(target.value)}
        >
          {categories.map(({ name, path }) => (
            <option key={path} value={name}>
              {name}
            </option>
          ))}
        </select>

        <button disabled={disabled()}> Create </button>
      </form>
    </div>
  );
}
