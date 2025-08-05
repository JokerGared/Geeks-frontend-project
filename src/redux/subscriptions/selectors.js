export const selectSubscriptions = (state) => state.subscriptions.list;

export const selectSubscriptionsError = (state) => state.subscriptions.error;

export const selectIsSubscribed = (authorId) => (state) =>
  state.subscriptions.list.some((sub) => sub._id === authorId);
