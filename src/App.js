import React, { useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import Start from './app/pages/start';
import Footer from './features/footer/Footer';
import Nav from './features/nav/Nav';
import Categories from './app/pages/category';
import Post from './app/pages/category/post';
import Add from './app/pages/add';
import Edit from './app/pages/edit';
import fetchPosts from './features/posts/thunks/fetchPosts';
import fetchCategories from './features/categories/thunks/fetchCategories';
import NotFound from './app/pages/notFound/NotFound';

function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchPosts());
    dispatch(fetchCategories());
  }, [dispatch]);
  return (
    <div className="wrapper">
      <div className="container">
        <Nav />
        <Routes>
          <Route path="*" element={<NotFound />} />
          <Route path="/" element={<Start />} />
          <Route path="/add" element={<Add />} />
          <Route path="/:category" element={<Categories />} />
          <Route path="/:category/:postId" element={<Post />} />
          <Route path="/:category/:postId/edit" element={<Edit />} />
        </Routes>
      </div>
      <Footer />
    </div>
  );
}

export default App;
