import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { fetchPosts } from './features/posts/slice';
import { fetchCategories } from './features/categories/slice';
function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchPosts());
    dispatch(fetchCategories());
  }, [dispatch]);
  return (
    <div className="App">
      <h1>App</h1>
    </div>
  );
}

export default App;
