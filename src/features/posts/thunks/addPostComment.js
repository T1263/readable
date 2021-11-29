import { createAsyncThunk } from '@reduxjs/toolkit';
import { API_URL, fetchOptions } from '../../../app/shared';

const addPostComment = createAsyncThunk('posts/addComment', async (post) => {
  const res = await fetch(API_URL + '/comments', {
    ...fetchOptions,
    method: 'POST',
    body: JSON.stringify(post),
  });

  return await res.json();
});

export default addPostComment;
