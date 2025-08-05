import { createSlice } from '@reduxjs/toolkit';
import {
  fetchFavorites,
  addToFavorites,
  removeFromFavorites,
} from './operations.js';
import { logOut } from '../auth/operations';

const initialState = {
  items: [],
  error: null,
  page: 1,
  totalPages: 1,
  hasNextPage: false,
  hasPreviousPage: false,
};

const favoritesSlice = createSlice({
  name: 'favorites',
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(fetchFavorites.pending, (state) => {
        state.error = null;
      })
      .addCase(fetchFavorites.fulfilled, (state, action) => {
        state.items = [...state.items, ...action.payload.data];
        state.page = action.payload.page;
        state.totalPages = action.payload.totalPages;
        state.hasNextPage = action.payload.hasNextPage;
        state.hasPreviousPage = action.payload.hasPreviousPage;
      })
      .addCase(fetchFavorites.rejected, (state, action) => {
        state.error = action.payload;
      })
      .addCase(addToFavorites.pending, (state) => {
        state.error = null;
      })
      .addCase(addToFavorites.fulfilled, (state, action) => {
        const exists = state.items.some(
          (item) => item._id === action.payload._id,
        );
        if (!exists) {
          state.items.push(action.payload);
        }
      })
      .addCase(addToFavorites.rejected, (state, action) => {
        state.error = action.payload;
      })
      .addCase(removeFromFavorites.pending, (state) => {
        state.error = null;
      })
      .addCase(removeFromFavorites.fulfilled, (state, action) => {
        state.items = state.items.filter(
          (article) => article._id !== action.payload.articleId,
        );
      })
      .addCase(removeFromFavorites.rejected, (state, action) => {
        state.error = action.payload;
      })
      .addCase(logOut.fulfilled, (state) => {
        return initialState;
      });
  },
});

export default favoritesSlice.reducer;
