import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "react-hot-toast";

export const fetchArticles = createAsyncThunk(
  "articles/fetchAll",
  async (_, thunkAPI) => {
    try {
      const { data } = await axios.get("/articles");
      return data;
    } catch (error) {
      toast.error("Failed to load articles");
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const fetchArticleById = createAsyncThunk(
  "articles/fetchById",
  async (id, thunkAPI) => {
    try {
      const { data } = await axios.get(`/articles/${id}`);
      return data;
    } catch (error) {
      toast.error("Failed to load article");
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const createArticle = createAsyncThunk(
  "articles/create",
  async (formData, thunkAPI) => {
    try {
      const { data } = await axios.post("/articles", formData);
      toast.success("Article created");
      return data;
    } catch (error) {
      toast.error("Failed to create article");
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);
