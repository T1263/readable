import { createAsyncThunk } from '@reduxjs/toolkit';
import { API_URL, fetchOptions } from '../../../app/shared';

const addPost = createAsyncThunk('posts/new', async (post) => {
  const res = await fetch(API_URL + '/posts', {
    ...fetchOptions,
    method: 'POST',
    body: JSON.stringify(post),
  });

  return await res.json();
});

export default addPost;
