import { createAsyncThunk } from '@reduxjs/toolkit';
import { toast } from 'react-hot-toast';
import axios from 'axios';

export const fetchArticles = createAsyncThunk(
  'articles/fetchAll',
  async (page, thunkAPI) => {
    try {
      const { data } = await axios.get(`/articles?page=${page}&limit=12`);
      return data.data;
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
      return data.data;
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
    formData.append('img', credentials.img);
    if (credentials.desc) {
      formData.append('desc', credentials.desc);
    }

    try {
      const response = await axios.post('/articles', formData);
      return response.data.data;
    } catch (error) {
      const message = error.response?.data?.message || error.message;
      toast.error(message);
      return thunkAPI.rejectWithValue(message);
    }
  },
);

export const deleteArticle = createAsyncThunk(
  'articles/delete',
  async (id, thunkAPI) => {
    try {
      await axios.delete(`/articles/${id}`);
      return id;
    } catch (error) {
      toast.error('Failed to delete article');
      return thunkAPI.rejectWithValue(error.message);
    }
  },
);

export const updateArticle = createAsyncThunk(
  'articles/update',
  async ({ id, updates }, thunkAPI) => {
    try {
      const formData = new FormData();
      if (updates.title) formData.append('title', updates.title);
      if (updates.article) formData.append('article', updates.article);
      if (updates.desc) formData.append('desc', updates.desc);
      if (updates.img) formData.append('img', updates.img);

      const { data } = await axios.patch(`/articles/${id}`, formData);
      return data.data;
    } catch (error) {
      toast.error('Failed to update article');
      return thunkAPI.rejectWithValue(error.message);
    }
  },
);
