import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from '../../api/axiosInstance';
import { toast } from 'react-hot-toast';

export const fetchFavorites = createAsyncThunk(
  'favorites/fetchAll',
  async ({ userId, page = 1 }, thunkAPI) => {
    console.log('[fetchFavorites] thunk called');
    const state = thunkAPI.getState();
    const token = state.auth.token;
    console.log('[fetchFavorites] token:', token);
    if (!token) return thunkAPI.rejectWithValue('No token');
    try {
      const url = `/users/me/saved-articles?page=${page}&perPage=12`;
      console.log('[fetchFavorites] Making request to:', url);

      const { data } = await axios.get(url, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      console.log('[fetchFavorites] response:', data);

      return data.data;
    } catch (error) {
      toast.error('Failed to load favorites');
      return thunkAPI.rejectWithValue(error.message);
    }
  },
);

export const addToFavorites = createAsyncThunk(
  'favorites/add',
  async ({ userId, articleId }, thunkAPI) => {
    const state = thunkAPI.getState();
    const token = state.auth.token;
    if (!token) return thunkAPI.rejectWithValue('No token');
    try {
      // const { data } =
      await axios.put(`/users/me/saved-articles/${articleId}`, null, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      toast.success('Added to favorites');
      return;
      // data;
    } catch (error) {
      toast.error('Failed to add to favorites');
      return thunkAPI.rejectWithValue(error.message);
    }
  },
);

export const removeFromFavorites = createAsyncThunk(
  'favorites/remove',
  async ({ userId, articleId }, thunkAPI) => {
    const state = thunkAPI.getState();
    const token = state.auth.token;
    if (!token) return thunkAPI.rejectWithValue('No token');
    try {
      await axios.delete(`/users/me/saved-articles/${articleId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      toast.success('Removed from favorites');
      return { articleId };
    } catch (error) {
      toast.error('Failed to remove from favorites');
      return thunkAPI.rejectWithValue(error.message);
    }
  },
);
