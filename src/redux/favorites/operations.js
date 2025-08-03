import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from '../../api/axiosInstance';
import { toast } from 'react-hot-toast';

// export const fetchFavorites = createAsyncThunk(
//   'favorites/fetchAll',
//   async ({ userId, page = 1 }, thunkAPI) => {
//     const state = thunkAPI.getState();
//     const token = state.auth.token;
//     console.log('TOKEN:', token);
//     if (!token) return thunkAPI.rejectWithValue('No token');
//     try {
//       const { data } = await axios.get(
//         `/users/${userId}/saved-articles?page=${page}&perPage=12`,
//         {
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         },
//       );
//       return data.data;
//     } catch (error) {
//       toast.error('Failed to load favorites');
//       return thunkAPI.rejectWithValue(error.message);
//     }
//   },
// );

export const fetchFavorites = createAsyncThunk(
  'favorites/fetchAll',
  async ({ userId, page = 1 }, thunkAPI) => {
    const state = thunkAPI.getState();
    const token = state.auth.token;

    console.log('%c[favorites thunk] TOKEN:', 'color: green', token);
    console.log('%c[favorites thunk] USER ID:', 'color: green', userId);
    console.log('%c[favorites thunk] PAGE:', 'color: green', page);

    if (!token) {
      console.warn(
        '%c[favorites thunk] ❌ No token. Aborting request.',
        'color: red',
      );
      return thunkAPI.rejectWithValue('No token');
    }

    try {
      const url = `/users/${userId}/saved-articles?page=${page}&perPage=12`;
      console.log('%c[favorites thunk] FETCHING:', 'color: blue', url);

      const { data } = await axios.get(url, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      console.log('%c[favorites thunk] ✅ Success:', 'color: green', data.data);
      return data.data;
    } catch (error) {
      console.error(
        '%c[favorites thunk] ❌ Error fetching:',
        'color: red',
        error,
      );
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
      await axios.put(`/users/${userId}/saved-articles/${articleId}`, null, {
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
      await axios.delete(`/users/${userId}/saved-articles/${articleId}`, {
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
