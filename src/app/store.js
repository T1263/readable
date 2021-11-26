import { configureStore } from '@reduxjs/toolkit';
import posts from '../features/posts/slice';
import categories from '../features/categories/slice';
export const store = configureStore({
  reducer: {
    posts,
    categories,
  },
});
