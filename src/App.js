import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { fetchPosts } from './features/posts/slice';
import { fetchCategories } from './features/categories/slice';
import Start from './app/pages/start';
import { Routes, Route } from 'react-router';

function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchPosts());
    dispatch(fetchCategories());
  }, [dispatch]);
  return (
    <div className="App">
      <h1>Logo</h1>
      <Routes>
        <Route path="/" element={<Start />} />
      </Routes>
    </div>
  );
}

export default App;
