import React from 'react';
import { useSelector } from 'react-redux';

import PostsWrapper from '../../../features/PostsWrapper';

export default function Start() {
  const [posts, categories] = useSelector(({ posts, categories }) => [
    posts.list,
    categories.list,
  ]);

  return <PostsWrapper categories={categories} posts={posts} />;
}
