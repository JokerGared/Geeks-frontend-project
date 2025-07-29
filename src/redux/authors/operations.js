import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { toast } from 'react-hot-toast';

export const fetchAuthors = createAsyncThunk(
  'authors/fetchAll',
  async (page, thunkAPI) => {
    try {
      const { data } = await axios.get(`/users?page=${page}&limit=20`);
      return data.data;
    } catch (error) {
      toast.error('Failed to load authors');
      return thunkAPI.rejectWithValue(error.message);
    }
  },
);

export const fetchAuthorById = createAsyncThunk(
  'authors/fetchById',
  async (id, thunkAPI) => {
    try {
      const { data } = await axios.get(`/users/${id}`);
      return data.data;
    } catch (error) {
      toast.error('Failed to load author profile');
      return thunkAPI.rejectWithValue(error.message);
    }
  },
);
