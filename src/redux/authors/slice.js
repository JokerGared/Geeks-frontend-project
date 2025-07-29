import { createSlice } from '@reduxjs/toolkit';
import { fetchAuthors, fetchAuthorById } from './operations.js';

const initialState = {
  list: [],
  current: null,
  isLoading: false,
  error: null,
  page: 1,
  totalPages: 1,
  hasNextPage: false,
  hasPreviousPage: false,
};

const authorsSlice = createSlice({
  name: 'authors',
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(fetchAuthors.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchAuthors.fulfilled, (state, action) => {
        state.isLoading = false;
        state.list = [...state.list, ...action.payload.authors];
        state.page = action.payload.page;
        state.totalPages = action.payload.totalPages;
        state.hasNextPage = action.payload.hasNextPage;
        state.hasPreviousPage = action.payload.hasPreviousPage;
      })
      .addCase(fetchAuthors.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      .addCase(fetchAuthorById.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchAuthorById.fulfilled, (state, action) => {
        state.isLoading = false;
        state.current = action.payload;
      })
      .addCase(fetchAuthorById.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
        state.current = null;
      });
  },
});

export default authorsSlice.reducer;
