import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { API_URL } from '../../app/shared';

const fetchOptions = {
  method: 'GET',
  headers: {
    'Content-Type': 'application/json',
    Authorization: 'sdasass',
  },
};
export const fetchPosts = createAsyncThunk('posts/fetchAll', async () => {
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

export const addPost = createAsyncThunk('posts/new', async (post) => {
  const res = await fetch(API_URL + '/posts', {
    ...fetchOptions,
    method: 'POST',
    body: JSON.stringify(post),
  });

  return await res.json();
});

export const votePost = createAsyncThunk(
  'posts/vote',
  async ({ id, option }) => {
    const res = await fetch(`${API_URL}/posts/${id}`, {
      ...fetchOptions,
      method: 'POST',
      body: JSON.stringify({ option }),
    });

    return await res.json();
  }
);

export const editPost = createAsyncThunk('posts/edit', async (post) => {
  const res = await fetch(`${API_URL}/posts/${post.id}`, {
    ...fetchOptions,
    method: 'PUT',
    body: JSON.stringify({ ...post }),
  });

  return await res.json();
});

export const addPostComment = createAsyncThunk(
  'posts/addComment',
  async (post) => {
    const res = await fetch(API_URL + '/comments', {
      ...fetchOptions,
      method: 'POST',
      body: JSON.stringify(post),
    });

    return await res.json();
  }
);

const initialState = {
  list: [],
  comments: {},
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
    update: () => {},
    delete: () => {},
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
      state.comments = action.payload.comments;
      state.loading = false;
    });

    builder.addCase(addPost.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(addPost.fulfilled, (state, action) => {
      state.loading = false;
      state.list.push(action.payload);
    });

    builder.addCase(votePost.pending, (state) => {
      state.loading = true;
    });

    builder.addCase(votePost.fulfilled, (state, action) => {
      state.loading = false;
      const { id, voteScore } = action.payload;
      const thePost = state.list.find((post) => post.id === id);
      thePost.voteScore = voteScore;
    });

    builder.addCase(editPost.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(editPost.fulfilled, (state, action) => {
      state.loading = false;
      const _post = action.payload;
      const index = state.list.findIndex((post) => post.id === _post.id);
      state.list[index] = _post;
    });

    builder.addCase(addPostComment.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(addPostComment.fulfilled, (state, action) => {
      state.loading = false;
      const comment = action.payload;
      state.comments[comment.parentId].push(comment);
    });
  },
});

export const { create } = slice.actions;

export default slice.reducer;
