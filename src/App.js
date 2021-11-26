import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { fetchPosts } from './features/posts/slice';
import { fetchCategories } from './features/categories/slice';
import Start from './app/pages/start';

function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchPosts());
    dispatch(fetchCategories());
  }, [dispatch]);
  return (
    <div className="App">
      <h1>Logo</h1>
      <Start />
    </div>
  );
}

export default App;
