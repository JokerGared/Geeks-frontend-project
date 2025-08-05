import { createSelector } from '@reduxjs/toolkit';
import { selectArticles } from '../articles/selectors';

export const selectAuthors = (state) => state.authors.list;

export const selectCurrentAuthor = (state) => state.authors.current;

export const selectAuthorsLoading = (state) => state.authors.isLoading;

export const selectAuthorsError = (state) => state.authors.error;

export const selectAuthorsHasNextPage = (state) => state.authors.hasNextPage;

export const selectAuthorsHasPreviousPage = (state) =>
  state.authors.hasPreviousPage;

export const selectTopCreators = createSelector(
  [selectArticles, selectAuthors],
  (articles) => {
    const popularArticles = articles.toSorted((a, b) => b.rate - a.rate);
    const topCreators = popularArticles.map((article) => article.ownerId);
    const firstSixTopCreators = topCreators.slice(0, 6);
    return firstSixTopCreators;
  },
);
