export const selectArticles = (state) => state.articles.items;

export const selectCurrentArticle = (state) => state.articles.current;

export const selectArticlesLoading = (state) => state.articles.isLoading;

export const selectArticlesError = (state) => state.articles.error;
