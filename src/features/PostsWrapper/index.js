import React from 'react';
import CategoriesList from '../categories/List';
import PostsList from '../posts/List';
import css from './PostsWrapper.module.css';
export default function PostsWrapper({ posts, categories }) {
  return (
    <div className={css.wrapper}>
      <CategoriesList categories={categories} />
      <PostsList posts={posts} />
    </div>
  );
}
