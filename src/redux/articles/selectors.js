import { createSelector } from '@reduxjs/toolkit';

export const selectArticles = (state) => state.articles.items;

export const selectPopularArticles = (state) => state.articles.popularArticles;

export const selectCurrentArticle = (state) => state.articles.current;

export const selectAuthorArticles = (state) => state.articles.authorArticles;

export const selectArticlesError = (state) => state.articles.error;

export const selectArticlesHasNextPage = (state) => state.articles.hasNextPage;

export const selectArticlesHasPreviousPage = (state) =>
  state.articles.hasPreviousPage;

export const selectArticlesPage = (state) => state.articles.page;

export const selectFirstFourPopularArticles = createSelector(
  [selectPopularArticles],
  (articles) => {
    const firstFourArticles = articles.slice(0, 4);
    return firstFourArticles;
  },
);
