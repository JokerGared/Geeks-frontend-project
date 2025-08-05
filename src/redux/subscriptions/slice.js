import { createSlice } from '@reduxjs/toolkit';
import {
  fetchSubscriptions,
  subscribeToAuthor,
  unsubscribeFromAuthor,
} from './operations.js';

const initialState = {
  list: [],
  error: null,
};

const subscriptionsSlice = createSlice({
  name: 'subscriptions',
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(fetchSubscriptions.pending, (state) => {
        state.error = null;
      })
      .addCase(fetchSubscriptions.fulfilled, (state, action) => {
        state.list = action.payload;
      })
      .addCase(fetchSubscriptions.rejected, (state, action) => {
        state.error = action.payload;
      })
      .addCase(subscribeToAuthor.pending, (state) => {
        state.error = null;
      })
      .addCase(subscribeToAuthor.fulfilled, (state, action) => {
        state.list.push(action.payload);
      })
      .addCase(subscribeToAuthor.rejected, (state, action) => {
        state.error = action.payload;
      })
      .addCase(unsubscribeFromAuthor.pending, (state) => {
        state.error = null;
      })
      .addCase(unsubscribeFromAuthor.fulfilled, (state, action) => {
        state.list = state.list.filter(
          (author) => author._id !== action.payload._id,
        );
      })
      .addCase(unsubscribeFromAuthor.rejected, (state, action) => {
        state.error = action.payload;
      });
  },
});

export default subscriptionsSlice.reducer;
