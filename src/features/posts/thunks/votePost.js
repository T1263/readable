import { createAsyncThunk } from '@reduxjs/toolkit';
import { API_URL, fetchOptions } from '../../../app/shared';

const votePost = createAsyncThunk('posts/vote', async ({ id, option }) => {
  const res = await fetch(`${API_URL}/posts/${id}`, {
    ...fetchOptions,
    method: 'POST',
    body: JSON.stringify({ option }),
  });

  return await res.json();
});

export default votePost;
