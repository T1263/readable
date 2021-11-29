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
    createCommentsList: (state, action) => {
      const { id } = action.payload;
      state.comments[id] = [];
    },
    incrementCommentCount: (state, action) => {
      const { parentId } = action.payload;
      const thePost = state.list.find((post) => post.id === parentId);
      thePost.commentCount++;
    },
    decrementCommentCount: (state, action) => {
      const { parentId } = action.payload;
      const thePost = state.list.find((post) => post.id === parentId);
      thePost.commentCount--;
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
      // Create empty comments list for the post
      slice.caseReducers.createCommentsList(state, action);
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

      state.list = state.list
        .filter((post) => post.id !== _post.id)
        .concat([_post]);
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
      const { parentId, voteScore, id } = action.payload;

      const theComment = state.comments[parentId].find(
        (comment) => comment.id === id
      );
      theComment.voteScore = voteScore;
    });

    builder.addCase(deletePost.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(deletePost.fulfilled, (state, action) => {
      state.loading = false;
      const { id } = action.payload;
      state.list = state.list.filter((post) => post.id !== id);
    });

    builder.addCase(deletePostComment.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(deletePostComment.fulfilled, (state, action) => {
      state.loading = false;
      const { parentId, id } = action.payload;

      state.comments[parentId] = state.comments[parentId].filter(
        (comment) => comment.id !== id
      );

      // Decrement comment Count
      slice.caseReducers.decrementCommentCount(state, action);
    });
  },
});

export default slice.reducer;
