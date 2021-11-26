import { API_URL } from '../../app/shared';

const { createSlice, createAsyncThunk } = require('@reduxjs/toolkit');

export const fetchCategories = createAsyncThunk(
  'categories/fetchAll',
  async () => {
    const res = await fetch(API_URL + '/categories', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'sdasass',
      },
    });

    return res.json();
  }
);

const initialState = {
  list: [],
  loading: false,
};

const slice = createSlice({
  name: 'categories',
  initialState,
  extraReducers: (builder) => {
    builder.addCase(fetchCategories.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchCategories.fulfilled, (state, action) => {
      state.loading = false;
      state.list.push(...action.payload['categories']);
    });
  },
});

export default slice.reducer;
