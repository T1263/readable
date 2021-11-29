import { createSlice } from '@reduxjs/toolkit';
import addPost from './thunks/addPost';
import addPostComment from './thunks/addPostComment';
import deletePost from './thunks/deletePost';
import deletePostComment from './thunks/deletePostComment';
import editPost from './thunks/editPost';
import fetchPosts from './thunks/fetchPosts';
import votePost from './thunks/votePost';
import votePostComment from './thunks/votePostComment';

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
      const { parentId } = action.payload;
      // TODO: Replace findIndex
      const index = state.list.findIndex((post) => post.id === parentId);
      state.list[index].commentCount++;
    },
    decrementCommentCount: (state, action) => {
      const { parentId } = action.payload;
      // TODO: Replace findIndex
      const index = state.list.findIndex((post) => post.id === parentId);
      state.list[index].commentCount--;
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
      const { id } = action.payload;
      state.loading = false;
      state.list.push(action.payload);
      // Create empty comments list for the post
      state.comments[id] = [];
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
      // TODO: Replace findIndex
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
      // Call our incrementCommentCount reducer
      slice.caseReducers.incrementCommentCount(state, action);
    });

    builder.addCase(votePostComment.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(votePostComment.fulfilled, (state, action) => {
      state.loading = false;
      const comment = action.payload;

      // TODO: Replace findIndex
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

      // Decrement comment Count
      slice.caseReducers.decrementCommentCount(state, action);
    });
  },
});

export default slice.reducer;
