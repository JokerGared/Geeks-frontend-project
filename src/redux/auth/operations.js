import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { toast } from 'react-hot-toast';

const setAuthHeader = (value) => {
  axios.defaults.headers.common.Authorization = value;
};

export const register = createAsyncThunk(
  'auth/register',
  async (credentials, thunkAPI) => {
    try {
      const formData = new FormData();
      formData.append('name', credentials.name);
      formData.append('email', credentials.email);
      formData.append('password', credentials.password);
      if (credentials.avatar) {
        formData.append('avatar', credentials.avatar);
      }

      const response = await axios.post('/users/signup', formData);
      setAuthHeader(`Bearer ${response.data.token}`);
      return response.data;
    } catch (error) {
      const message =
        error.response?.status === 400
          ? 'User with this email is already registered'
          : error.response?.data?.message || error.message;

      toast.error(message);
      return thunkAPI.rejectWithValue(message);
    }
  },
);

export const logIn = createAsyncThunk(
  'auth/login',
  async (credentials, thunkAPI) => {
    try {
      const response = await axios.post('/users/login', credentials);
      setAuthHeader(`Bearer ${response.data.token}`);
      return response.data;
    } catch (error) {
      const message =
        error.response?.status === 400
          ? 'Invalid username or password'
          : error.response?.data?.message || error.message;

      toast.error(message);
      return thunkAPI.rejectWithValue(message);
    }
  },
);

export const logOut = createAsyncThunk('auth/logout', async () => {
  await axios.post('/users/logout');
  setAuthHeader('');
});

export const refreshUser = createAsyncThunk(
  'auth/refresh',
  async (_, thunkAPI) => {
    try {
      const state = thunkAPI.getState();
      const token = state.auth.token;
      if (!token) throw new Error('No token found');

      setAuthHeader(`Bearer ${token}`);
      const response = await axios.get('/users/current');
      return response.data;
    } catch (error) {
      toast.error('Oops...try again!');
      return thunkAPI.rejectWithValue(error.message);
    }
  },
);
