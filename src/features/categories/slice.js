import fetchCategories from './thunks/fetchCategories';
const { createSlice } = require('@reduxjs/toolkit');
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
