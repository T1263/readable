import { createAsyncThunk } from '@reduxjs/toolkit';
import { API_URL, fetchOptions } from '../../../app/shared';

const deletePost = createAsyncThunk('posts/delete', async (id) => {
  const res = await fetch(`${API_URL}/posts/${id}`, {
    ...fetchOptions,
    method: 'DELETE',
  });

  return await res.json();
});

export default deletePost;
