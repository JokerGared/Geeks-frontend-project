import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from '../../api/axiosInstance';
import { toast } from 'react-hot-toast';

export const fetchFavorites = createAsyncThunk(
  'favorites/fetchAll',
  async ({ page = 1 }, thunkAPI) => {
    try {
      const url = `/users/me/saved-articles?page=${page}&perPage=12`;

      const { data } = await axios.get(url);

      return data.data;
    } catch (error) {
      toast.error('Failed to load favorites');
      return thunkAPI.rejectWithValue(error.message);
    }
  },
);

export const addToFavorites = createAsyncThunk(
  'favorites/add',
  async ({ article }, thunkAPI) => {
    try {
      await axios.put(`/users/me/saved-articles/${article._id}`, null);
      toast.success('Added to favorites');
      return article;
    } catch (error) {
      toast.error('Failed to add to favorites');
      return thunkAPI.rejectWithValue(error.message);
    }
  },
);

export const removeFromFavorites = createAsyncThunk(
  'favorites/remove',
  async ({ articleId }, thunkAPI) => {
    try {
      await axios.delete(`/users/me/saved-articles/${articleId}`);
      toast.success('Removed from favorites');
      return { articleId };
    } catch (error) {
      toast.error('Failed to remove from favorites');
      return thunkAPI.rejectWithValue(error.message);
    }
  },
);
