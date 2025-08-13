export const selectSubscriptions = (state) => state.subscriptions.list;

export const selectSubscriptionsError = (state) => state.subscriptions.error;

export const selectIsSubscribed = (authorId) => (state) =>
  Array.isArray(state.subscriptions.list) &&
  state.subscriptions.list.some((sub) => sub._id === authorId);
