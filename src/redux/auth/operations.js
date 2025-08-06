import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from '../../api/axiosInstance';
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

      const response = await axios.post('/auth/register', formData);
      const fetchedData = response.data.data;
      setAuthHeader(`Bearer ${fetchedData.accessToken}`);
      return fetchedData;
    } catch (error) {
      const message =
        error.response?.status === 409
          ? 'User with this email is already registered'
          : error.response?.data?.data || error.message;
      toast.error(message);
      return thunkAPI.rejectWithValue(message);
    }
  },
);

export const logIn = createAsyncThunk(
  'auth/login',
  async (credentials, thunkAPI) => {
    try {
      const response = await axios.post('/auth/login', credentials);
      const fetchedData = response.data.data;
      setAuthHeader(`Bearer ${fetchedData.accessToken}`);
      return response.data.data;
    } catch (error) {
      const message =
        error.response?.status === 400
          ? 'Invalid username or password'
          : error.response?.data?.data.message || error.message;

      toast.error(`${message}! Please, enter correct password and email`);
      return thunkAPI.rejectWithValue(message);
    }
  },
);

export const logOut = createAsyncThunk('auth/logout', async () => {
  await axios.post('/auth/logout');
  setAuthHeader('');
});

export const refreshUser = createAsyncThunk(
  'auth/refresh',
  async (_, thunkAPI) => {
    try {
      const state = thunkAPI.getState();
      const token = state.auth.token;

      if (!token) return thunkAPI.rejectWithValue('No token found');

      setAuthHeader(`Bearer ${token}`);
      const response = await axios.post('/auth/refresh');
      return response.data.data;
    } catch (error) {
      toast.error('Oops...try again!');
      return thunkAPI.rejectWithValue(error.message);
    }
  },
);
