import { createSlice } from '@reduxjs/toolkit';

const globalSlice = createSlice({
  name: 'global',
  initialState: { isLoading: false },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addMatcher(
        (action) => action.type.endsWith('/pending'),
        (state) => {
          state.isLoading = true;
        },
      )
      .addMatcher(
        (action) =>
          action.type.endsWith('/fulfilled') ||
          action.type.endsWith('/rejected'),
        (state) => {
          state.isLoading = false;
        },
      );
  },
});

export default globalSlice.reducer;
