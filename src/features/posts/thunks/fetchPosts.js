import { createAsyncThunk } from '@reduxjs/toolkit';
import { API_URL, fetchOptions } from '../../../app/shared';

const fetchPosts = createAsyncThunk('posts/fetchAll', async () => {
  const res = await fetch(API_URL + '/posts', fetchOptions);

  // Get all comments for a single Post
  const posts = await res.json();
  let comments = {};
  for (const post of posts) {
    const postComment = await fetch(
      `${API_URL}/posts/${post.id}/comments`,
      fetchOptions
    );
    comments[post.id] = await postComment.json();
  }

  // Return Post with comments
  return { posts, comments };
});

export default fetchPosts;
