import { createAsyncThunk } from '@reduxjs/toolkit';
import { API_URL, fetchOptions } from '../../../app/shared';

const deletePostComment = createAsyncThunk(
  'posts/deleteComment',
  async (id) => {
    const res = await fetch(`${API_URL}/comments/${id}`, {
      ...fetchOptions,
      method: 'DELETE',
    });

    return await res.json();
  }
);

export default deletePostComment;
