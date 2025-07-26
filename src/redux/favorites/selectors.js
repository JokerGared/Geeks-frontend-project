export const selectFavorites = (state) => state.favorites.items;

export const selectFavoritesLoading = (state) => state.favorites.isLoading;

export const selectFavoritesError = (state) => state.favorites.error;
