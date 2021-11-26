import React, { useEffect } from 'react';
import { Routes, Route } from 'react-router';
import { useDispatch } from 'react-redux';
import { fetchPosts } from './features/posts/slice';
import { fetchCategories } from './features/categories/slice';
import Start from './app/pages/start';
import Footer from './features/footer/Footer';
import Nav from './features/nav/Nav';
import Categories from './app/pages/category';
import Post from './app/pages/category/post';

function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchPosts());
    dispatch(fetchCategories());
  }, [dispatch]);
  return (
    <div className="wrapper">
      <Nav />
      <div className="container">
        <Routes>
          <Route path="/" element={<Start />} />
          <Route path="/:category" element={<Categories />} />
          <Route path="/:category/:postId" element={<Post />} />
        </Routes>
      </div>
      <Footer />
    </div>
  );
}

export default App;
