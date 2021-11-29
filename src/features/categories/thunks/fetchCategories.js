import { API_URL, fetchOptions } from '../../../app/shared';
const { createAsyncThunk } = require('@reduxjs/toolkit');

const fetchCategories = createAsyncThunk('categories/fetchAll', async () => {
  const res = await fetch(API_URL + '/categories', fetchOptions);

  return res.json();
});

export default fetchCategories;
