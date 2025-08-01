export const selectAuthors = (state) => state.authors.list;

export const selectCurrentAuthor = (state) => state.authors.current;

export const selectAuthorsLoading = (state) => state.authors.isLoading;

export const selectAuthorsError = (state) => state.authors.error;

export const selectAuthorsHasNextPage = (state) => state.authors.hasNextPage;

export const selectAuthorsHasPreviousPage = (state) =>
  state.authors.hasPreviousPage;
