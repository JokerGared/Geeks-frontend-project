import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from '../../api/axiosInstance';
import { toast } from 'react-hot-toast';

export const fetchSubscriptions = createAsyncThunk(
  'subscriptions/fetchAll',
  async (_, thunkAPI) => {
    try {
      const { data } = await axios.get('/users/me/subscriptions');
      return data;
    } catch (error) {
      toast.error('Failed to load subscriptions');
      return thunkAPI.rejectWithValue(error.message);
    }
  },
);

export const subscribeToAuthor = createAsyncThunk(
  'subscriptions/subscribe',
  async (authorId, thunkAPI) => {
    try {
      const { data } = await axios.post(`/users/${authorId}/subscribe`);
      toast.success('Subscribed');
      return data;
    } catch (error) {
      toast.error('Subscription failed');
      return thunkAPI.rejectWithValue(error.message);
    }
  },
);

export const unsubscribeFromAuthor = createAsyncThunk(
  'subscriptions/unsubscribe',
  async (authorId, thunkAPI) => {
    try {
      const { data } = await axios.delete(`/users/${authorId}/unsubscribe`);
      toast.success('Unsubscribed');
      return data;
    } catch (error) {
      toast.error('Unsubscription failed');
      return thunkAPI.rejectWithValue(error.message);
    }
  },
);
