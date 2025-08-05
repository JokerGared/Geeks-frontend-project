import { createSelector } from '@reduxjs/toolkit';

export const selectArticles = (state) => state.articles.items;

export const selectCurrentArticle = (state) => state.articles.current;

export const selectAuthorArticles = (state) => state.articles.authorArticles;

export const selectArticlesError = (state) => state.articles.error;

export const selectArticlesHasNextPage = (state) => state.articles.hasNextPage;

export const selectArticlesHasPreviousPage = (state) =>
  state.articles.hasPreviousPage;

export const selectArticlesPage = (state) => state.articles.page;

export const selectPopularArticles = createSelector(
  [selectArticles],
  (articles) => {
    const popularArticles = articles.toSorted((a, b) => b.rate - a.rate);
    const firstFourArticles = popularArticles.slice(0, 4);
    return firstFourArticles;
  },
);
