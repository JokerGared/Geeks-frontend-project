import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "react-hot-toast";

export const fetchAuthors = createAsyncThunk(
  "authors/fetchAll",
  async (_, thunkAPI) => {
    try {
      const { data } = await axios.get("/authors");
      return data;
    } catch (error) {
      toast.error("Failed to load authors");
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const fetchAuthorById = createAsyncThunk(
  "authors/fetchById",
  async (id, thunkAPI) => {
    try {
      const { data } = await axios.get(`/authors/${id}`);
      return data;
    } catch (error) {
      toast.error("Failed to load author profile");
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);
