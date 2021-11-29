import { createAsyncThunk } from '@reduxjs/toolkit';
import { API_URL, fetchOptions } from '../../../app/shared';

const editPost = createAsyncThunk('posts/edit', async (post) => {
  const res = await fetch(`${API_URL}/posts/${post.id}`, {
    ...fetchOptions,
    method: 'PUT',
    body: JSON.stringify({ ...post }),
  });

  return await res.json();
});

export default editPost;
