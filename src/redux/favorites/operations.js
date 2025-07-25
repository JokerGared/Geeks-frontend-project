import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "react-hot-toast";

export const fetchFavorites = createAsyncThunk(
  "favorites/fetchAll",
  async (_, thunkAPI) => {
    try {
      const { data } = await axios.get("/favorites");
      return data;
    } catch (error) {
      toast.error("Failed to load favorites");
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const addToFavorites = createAsyncThunk(
  "favorites/add",
  async (articleId, thunkAPI) => {
    try {
      const { data } = await axios.post(`/favorites/${articleId}`);
      toast.success("Added to favorites");
      return data;
    } catch (error) {
      toast.error("Failed to add to favorites");
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const removeFromFavorites = createAsyncThunk(
  "favorites/remove",
  async (articleId, thunkAPI) => {
    try {
      const { data } = await axios.delete(`/favorites/${articleId}`);
      toast.success("Removed from favorites");
      return data;
    } catch (error) {
      toast.error("Failed to remove from favorites");
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);
