import { createAsyncThunk } from '@reduxjs/toolkit';
import { API_URL, fetchOptions } from '../../../app/shared';

const editPostComment = createAsyncThunk(
  'posts/editComment',
  async (comment) => {
    const res = await fetch(API_URL + `/comments/${comment.id}`, {
      ...fetchOptions,
      method: 'PUT',
      body: JSON.stringify(comment),
    });

    return await res.json();
  }
);

export default editPostComment;
