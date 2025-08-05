import { createSlice } from '@reduxjs/toolkit';
import {
  fetchSubscriptions,
  subscribeToAuthor,
  unsubscribeFromAuthor,
} from './operations.js';

const handlePending = (state) => {
  state.isLoading = true;
  state.error = null;
};

const handleRejected = (state, action) => {
  state.isLoading = false;
  state.error = action.payload;
};

const initialState = {
  list: [],
  isLoading: false,
  error: null,
};

const subscriptionsSlice = createSlice({
  name: 'subscriptions',
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(fetchSubscriptions.pending, handlePending)
      .addCase(fetchSubscriptions.fulfilled, (state, action) => {
        state.isLoading = false;
        state.list = action.payload.data;
      })
      .addCase(fetchSubscriptions.rejected, handleRejected)
      .addCase(subscribeToAuthor.pending, handlePending)
      .addCase(subscribeToAuthor.fulfilled, (state, action) => {
        state.isLoading = false;
        state.list = action.payload.data;
      })
      .addCase(subscribeToAuthor.rejected, handleRejected)
      .addCase(unsubscribeFromAuthor.pending, handlePending)
      .addCase(unsubscribeFromAuthor.fulfilled, (state, action) => {
        state.isLoading = false;
        state.list = action.payload.data;
      })
      .addCase(unsubscribeFromAuthor.rejected, handleRejected);
  },
});

export default subscriptionsSlice.reducer;
