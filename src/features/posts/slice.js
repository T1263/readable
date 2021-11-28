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

export const votePostComment = createAsyncThunk(
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
  async (post, { dispatch }) => {
    const res = await fetch(API_URL + '/comments', {
      ...fetchOptions,
      method: 'POST',
      body: JSON.stringify(post),
    });

    dispatch(incrementCommentCount(post.parentId));
    return await res.json();
  }
);

export const deletePost = createAsyncThunk('posts/delete', async (id) => {
  const res = await fetch(`${API_URL}/posts/${id}`, {
    ...fetchOptions,
    method: 'DELETE',
  });

  return await res.json();
});

export const deletePostComment = createAsyncThunk(
  'posts/deleteComment',
  async (id) => {
    const res = await fetch(`${API_URL}/comments/${id}`, {
      ...fetchOptions,
      method: 'DELETE',
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
    incrementCommentCount: (state, action) => {
      const parentId = action.payload;
      const index = state.list.findIndex((post) => post.id === parentId);
      state.list[index].commentCount++;
    },
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

    builder.addCase(votePostComment.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(votePostComment.fulfilled, (state, action) => {
      state.loading = false;
      const comment = action.payload;
      const index = state.comments[comment.parentId].findIndex(
        (c) => c.id === comment.id
      );
      state.comments[comment.parentId][index] = comment;
    });

    builder.addCase(deletePost.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(deletePost.fulfilled, (state, action) => {
      state.loading = false;
      const { id } = action.payload;
      const index = state.list.findIndex((c) => c.id === id);
      delete state.list[index];
    });

    builder.addCase(deletePostComment.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(deletePostComment.fulfilled, (state, action) => {
      state.loading = false;
      const comment = action.payload;
      const index = state.comments[comment.parentId].findIndex(
        (c) => c.id === comment.id
      );
      delete state.comments[comment.parentId][index];
    });
  },
});

export const { incrementCommentCount } = slice.actions;

export default slice.reducer;
