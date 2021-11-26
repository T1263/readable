import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

const fetchOptions = {
  method: 'GET',
  headers: {
    'Content-Type': 'application/json',
    Authorization: 'sdasass',
  },
};
export const fetchPosts = createAsyncThunk('posts/fetchAll', async () => {
  const res = await fetch('http://localhost:3001/posts', fetchOptions);

  // Get all comments for a single Post
  const posts = await res.json();
  let comments = [];
  for (const comment of posts) {
    const postComment = await fetch(
      `http://localhost:3001/posts/${comment.id}/comments`,
      fetchOptions
    );
    comments.push(await postComment.json());
  }

  // Return Post with comments
  return { posts, comments: comments[0] };
});

const initialState = {
  list: [],
  comments: [],
  loading: false,
  error: {
    name: '',
    message: '',
  },
};

export const slice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    create: () => {},
    update: () => {},
    delete: () => {},
    addComment: () => {},
    deleteComment: () => {},
  },
  extraReducers: (builder) => {
    builder.addCase(fetchPosts.rejected, (state, action) => {
      const { name, message } = action.error;
      state.error = { name, message };
    });
    builder.addCase(fetchPosts.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchPosts.fulfilled, (state, action) => {
      state.list.push(...action.payload.posts);
      state.comments.push(...action.payload.comments);
      state.loading = false;
    });
  },
});

export const { create } = slice.actions;

export default slice.reducer;
