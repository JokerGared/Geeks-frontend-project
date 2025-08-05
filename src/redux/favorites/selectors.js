export const selectFavorites = (state) => state.favorites.items;

export const selectFavoritesLoading = (state) => state.favorites.isLoading;

export const selectFavoritesError = (state) => state.favorites.error;

export const selectFavoritesPage = (state) => state.favorites.page;

export const selectFavoritesTotalPages = (state) => state.favorites.totalPages;

export const selectFavoritesHasNextPage = (state) =>
  state.favorites.hasNextPage;

export const selectFavoritesHasPreviousPage = (state) =>
  state.favorites.hasPreviousPage;
