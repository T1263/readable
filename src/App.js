import React, { useEffect } from 'react';
import { Routes, Route } from 'react-router';
import { useDispatch } from 'react-redux';
import { fetchPosts } from './features/posts/slice';
import { fetchCategories } from './features/categories/slice';
import Start from './app/pages/start';
import Footer from './features/footer/Footer';
import Nav from './features/nav/Nav';

function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchPosts());
    dispatch(fetchCategories());
  }, [dispatch]);
  return (
    <div className="App">
      <Nav />
      <Routes>
        <Route path="/" element={<Start />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
