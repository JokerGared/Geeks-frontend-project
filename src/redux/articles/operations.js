import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { toast } from 'react-hot-toast';

export const fetchArticles = createAsyncThunk(
  'articles/fetchAll',
  async (_, thunkAPI) => {
    try {
      const { data } = await axios.get('/articles');
      return data;
    } catch (error) {
      toast.error('Failed to load articles');
      return thunkAPI.rejectWithValue(error.message);
    }
  },
);

export const fetchArticleById = createAsyncThunk(
  'articles/fetchById',
  async (id, thunkAPI) => {
    try {
      const { data } = await axios.get(`/articles/${id}`);
      return data;
    } catch (error) {
      toast.error('Failed to load article');
      return thunkAPI.rejectWithValue(error.message);
    }
  },
);

export const createArticle = createAsyncThunk(
  'articles/create',
  async (credentials, thunkAPI) => {
    const formData = new FormData();
    formData.append('title', credentials.title);
    formData.append('article', credentials.article);
    formData.append('desc', credentials.desc);
    if (credentials.img) {
      formData.append('img', credentials.img);
    }

    try {
      const response = await axios.post('/articles', formData);
      return response.data;
    } catch (error) {
      const message =
        error.response?.status === 400
          ? 'Article with this title already exists'
          : error.response?.data?.message || error.message;

      toast.error(message);
      return thunkAPI.rejectWithValue(message);
    }
  },
);
