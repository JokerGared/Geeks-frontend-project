import { createSlice } from '@reduxjs/toolkit';
import {
  fetchArticles,
  fetchArticleById,
  fetchArticlesByAuthorId,
  createArticle,
  popularArticles,
} from './operations.js';

const handlePending = (state) => {
  state.error = null;
};

const handleRejected = (state, action) => {
  state.error = action.payload;
};

const initialState = {
  items: [],
  authorArticles: [],
  popularArticles: [],
  current: null,
  error: null,
  page: 1,
  totalPages: 1,
  totalItems: 0,
  hasNextPage: false,
  hasPreviousPage: false,
};

const articlesSlice = createSlice({
  name: 'articles',
  initialState,
  reducers: {
    clearArticles: (state) => {
      state.items = [];
    },
    clearPopularArticles: (state) => {
      state.popularArticles = [];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchArticles.pending, handlePending)
      .addCase(fetchArticles.fulfilled, (state, action) => {
        state.items = [...state.items, ...action.payload.articles];
        state.page = action.payload.page;
        state.totalPages = action.payload.totalPages;
        state.totalItems = action.payload.totalItems;
        state.hasNextPage = action.payload.hasNextPage;
        state.hasPreviousPage = action.payload.hasPreviousPage;
      })
      .addCase(fetchArticles.rejected, handleRejected)

      .addCase(fetchArticleById.pending, handlePending)
      .addCase(fetchArticleById.fulfilled, (state, action) => {
        state.current = action.payload;
      })
      .addCase(fetchArticleById.rejected, handleRejected)
      .addCase(fetchArticlesByAuthorId.pending, handlePending)
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
      .addCase(fetchArticlesByAuthorId.rejected, handleRejected)
      .addCase(createArticle.pending, handlePending)
      .addCase(createArticle.fulfilled, (state, action) => {
        state.items.unshift(action.payload);
      })
      .addCase(createArticle.rejected, handleRejected)
      .addCase(popularArticles.pending, handlePending)
      .addCase(popularArticles.fulfilled, (state, action) => {
        state.popularArticles = action.payload.articles;
      })
      .addCase(popularArticles.rejected, handleRejected);
  },
});

export const { clearArticles, clearPopularArticles } = articlesSlice.actions;

export default articlesSlice.reducer;
