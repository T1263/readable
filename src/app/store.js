import { configureStore } from '@reduxjs/toolkit';
import posts from '../features/posts/slice';
export const store = configureStore({
  reducer: {
    posts,
  },
});
