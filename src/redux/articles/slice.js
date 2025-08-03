import { createSlice } from '@reduxjs/toolkit';
import {
  fetchArticles,
  fetchArticleById,
  createArticle,
} from './operations.js';

const initialState = {
  items: [],
  current: null,
  isLoading: false,
  error: null,
  page: 1,
  totalPages: 1,
  hasNextPage: false,
  hasPreviousPage: false,
};

const articlesSlice = createSlice({
  name: 'articles',
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(fetchArticles.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchArticles.fulfilled, (state, action) => {
        state.isLoading = false;

        if (action.payload.page === 1) {
          state.items = action.payload.articles;
        } else {
          state.items = [...state.items, ...action.payload.articles];
        }

        // state.items = [...state.items, ...action.payload.articles];
        state.page = action.payload.page;
        state.totalPages = action.payload.totalPages;
        state.hasNextPage = action.payload.hasNextPage;
        state.hasPreviousPage = action.payload.hasPreviousPage;
      })
      .addCase(fetchArticles.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      .addCase(fetchArticleById.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchArticleById.fulfilled, (state, action) => {
        state.isLoading = false;
        state.current = action.payload;
      })
      .addCase(fetchArticleById.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      .addCase(createArticle.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(createArticle.fulfilled, (state, action) => {
        state.isLoading = false;
        state.items.unshift(action.payload);
      })
      .addCase(createArticle.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

export default articlesSlice.reducer;
