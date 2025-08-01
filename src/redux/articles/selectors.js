import { createSelector } from '@reduxjs/toolkit';

export const selectArticles = (state) => state.articles.items;

export const selectCurrentArticle = (state) => state.articles.current;

export const selectArticlesLoading = (state) => state.articles.isLoading;

export const selectArticlesError = (state) => state.articles.error;

export const selectArticlesHasNextPage = (state) => state.articles.hasNextPage;

export const selectArticlesHasPreviousPage = (state) =>
  state.articles.hasPreviousPage;

export const selectPopularArticles = createSelector(
  [selectArticles],
  (articles) => {
    const popularArticles = articles
      .toSorted((a, b) => b.rate - a.rate)
      .slice();

    const firstFourArticles = popularArticles.slice(0, 4);

    return firstFourArticles;
  },
);
