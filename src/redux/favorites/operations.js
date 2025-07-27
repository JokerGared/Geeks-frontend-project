import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { toast } from 'react-hot-toast';

export const fetchFavorites = createAsyncThunk(
  'favorites/fetchAll',
  async (userId, thunkAPI) => {
    try {
      const { data } = await axios.get(`/users/${userId}/saved-articles`);
      return data;
    } catch (error) {
      toast.error('Failed to load favorites');
      return thunkAPI.rejectWithValue(error.message);
    }
  },
);

export const addToFavorites = createAsyncThunk(
  'favorites/add',
  async ({ userId, articleId }, thunkAPI) => {
    try {
      const { data } = await axios.put(
        `/users/${userId}/saved-articles/${articleId}`,
      );
      toast.success('Added to favorites');
      return data;
    } catch (error) {
      toast.error('Failed to add to favorites');
      return thunkAPI.rejectWithValue(error.message);
    }
  },
);

export const removeFromFavorites = createAsyncThunk(
  'favorites/remove',
  async ({ userId, articleId }, thunkAPI) => {
    try {
      await axios.delete(`/users/${userId}/saved-articles/${articleId}`);
      toast.success('Removed from favorites');
      return { articleId };
    } catch (error) {
      toast.error('Failed to remove from favorites');
      return thunkAPI.rejectWithValue(error.message);
    }
  },
);
