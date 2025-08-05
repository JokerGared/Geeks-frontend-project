import { createSlice } from '@reduxjs/toolkit';
import {
  fetchArticles,
  fetchArticleById,
  fetchArticlesByAuthorId,
  createArticle,
} from './operations.js';

const initialState = {
  items: [],
  authorArticles: [],
  current: null,
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
        state.error = null;
      })
      .addCase(fetchArticles.fulfilled, (state, action) => {
        state.items = [...state.items, ...action.payload.articles];
        state.page = action.payload.page;
        state.totalPages = action.payload.totalPages;
        state.hasNextPage = action.payload.hasNextPage;
        state.hasPreviousPage = action.payload.hasPreviousPage;
      })
      .addCase(fetchArticles.rejected, (state, action) => {
        state.error = action.payload;
      })

      .addCase(fetchArticleById.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchArticleById.fulfilled, (state, action) => {
        state.current = action.payload;
      })
      .addCase(fetchArticleById.rejected, (state, action) => {
        state.error = action.payload;
      })
      .addCase(fetchArticlesByAuthorId.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchArticlesByAuthorId.fulfilled, (state, action) => {
        state.authorArticles =
          action.payload.page === 1
            ? action.payload.data
            : [...state.authorArticles, ...action.payload.data];
        state.page = action.payload.page;
        state.totalPages = action.payload.totalPages;
        state.hasNextPage = action.payload.hasNextPage;
        state.hasPreviousPage = action.payload.hasPreviousPage;
      })
      .addCase(fetchArticlesByAuthorId.rejected, (state, action) => {
        state.error = action.payload;
      })
      .addCase(createArticle.pending, (state) => {
        state.error = null;
      })
      .addCase(createArticle.fulfilled, (state, action) => {
        state.items.unshift(action.payload);
      })
      .addCase(createArticle.rejected, (state, action) => {
        state.error = action.payload;
      });
  },
});

export default articlesSlice.reducer;
