export const selectSubscriptions = (state) => state.subscriptions.list;

export const selectSubscriptionsLoading = (state) =>
  state.subscriptions.isLoading;

export const selectSubscriptionsError = (state) => state.subscriptions.error;
