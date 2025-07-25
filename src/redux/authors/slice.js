import { createSlice } from "@reduxjs/toolkit";
import { fetchAuthorById, fetchAuthors } from "./operations";

const initialState = {
  list: [],
  current: null,
  isLoading: false,
  error: null,
};

const authorsSlice = createSlice({
  name: "authors",
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(fetchAuthors.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchAuthors.fulfilled, (state, action) => {
        state.isLoading = false;
        state.list = action.payload;
      })
      .addCase(fetchAuthors.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      .addCase(fetchAuthorById.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchAuthorById.fulfilled, (state, action) => {
        state.isLoading = false;
        state.current = action.payload;
      })
      .addCase(fetchAuthorById.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

export default authorsSlice.reducer;
