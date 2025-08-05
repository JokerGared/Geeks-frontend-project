import { createSlice } from '@reduxjs/toolkit';
import {
  fetchSubscriptions,
  subscribeToAuthor,
  unsubscribeFromAuthor,
} from './operations.js';

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
      .addCase(fetchSubscriptions.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchSubscriptions.fulfilled, (state, action) => {
        state.isLoading = false;
        state.list = action.payload;
      })
      .addCase(fetchSubscriptions.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      .addCase(subscribeToAuthor.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(subscribeToAuthor.fulfilled, (state, action) => {
        state.isLoading = false;
        state.list = action.payload;
      })
      .addCase(subscribeToAuthor.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      .addCase(unsubscribeFromAuthor.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(unsubscribeFromAuthor.fulfilled, (state, action) => {
        state.isLoading = false;
        state.list = action.payload;
      })
      .addCase(unsubscribeFromAuthor.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

export default subscriptionsSlice.reducer;
