import { createSlice } from '@reduxjs/toolkit';
import {
  fetchSubscriptions,
  subscribeToAuthor,
  unsubscribeFromAuthor,
} from './operations.js';

const handlePending = (state) => {
  state.error = null;
};

const handleRejected = (state, action) => {
  state.error = action.payload;
};

const initialState = {
  list: [],
  error: null,
};

const subscriptionsSlice = createSlice({
  name: 'subscriptions',
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(fetchSubscriptions.pending, handlePending)
      .addCase(fetchSubscriptions.fulfilled, (state, action) => {
        state.list = action.payload.data;
        console.log(state.list);
        console.log(action.payload.data);
      })
      .addCase(fetchSubscriptions.rejected, handleRejected)
      .addCase(subscribeToAuthor.pending, handlePending)
      .addCase(subscribeToAuthor.rejected, handleRejected)
      .addCase(unsubscribeFromAuthor.pending, handlePending)
      .addCase(unsubscribeFromAuthor.rejected, handleRejected);
  },
});

export default subscriptionsSlice.reducer;
