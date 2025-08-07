import { createSlice } from '@reduxjs/toolkit';
import { fetchAuthors, fetchAuthorById } from './operations.js';

const initialState = {
  list: [],
  current: null,
  error: null,
  page: 1,
  totalPages: 1,
  hasNextPage: false,
  hasPreviousPage: false,
};

const authorsSlice = createSlice({
  name: 'authors',
  initialState,
  reducers: {
    clearAuthors: (state) => {
      state.current = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAuthors.pending, (state) => {
        state.error = null;
      })
      .addCase(fetchAuthors.fulfilled, (state, action) => {
        state.list = [...state.list, ...action.payload.data];
        state.page = action.payload.page;
        state.totalPages = action.payload.totalPages;
        state.hasNextPage = action.payload.hasNextPage;
        state.hasPreviousPage = action.payload.hasPreviousPage;
      })
      .addCase(fetchAuthors.rejected, (state, action) => {
        state.error = action.payload;
      })
      .addCase(fetchAuthorById.pending, (state) => {
        state.error = null;
      })
      .addCase(fetchAuthorById.fulfilled, (state, action) => {
        state.current = action.payload;
      })
      .addCase(fetchAuthorById.rejected, (state, action) => {
        state.error = action.payload;
        state.current = null;
      });
  },
});

export const { clearAuthors } = authorsSlice.actions;
export default authorsSlice.reducer;
