import { createAsyncThunk } from '@reduxjs/toolkit';
import { API_URL, fetchOptions } from '../../../app/shared';

const votePostComment = createAsyncThunk(
  'posts/voteComment',
  async ({ id, option }) => {
    const res = await fetch(`${API_URL}/comments/${id}`, {
      ...fetchOptions,
      method: 'POST',
      body: JSON.stringify({ option }),
    });

    return await res.json();
  }
);

export default votePostComment;
