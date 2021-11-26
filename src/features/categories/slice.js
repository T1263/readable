const { createSlice } = require('@reduxjs/toolkit');

const initialState = {
  list: [],
  loading: false,
};

const slice = createSlice({
  name: 'categories',
  initialState,
  extraReducers: {},
});

export default slice.reducer;
