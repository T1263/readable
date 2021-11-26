import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  list: [],
  loading: false,
};

const slice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    create: () => {},
  },
});

export const { create } = slice.actions;

export default slice.reducer;
