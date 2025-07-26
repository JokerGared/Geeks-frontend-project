import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "react-hot-toast";

export const fetchSubscriptions = createAsyncThunk(
  "subscriptions/fetchAll",
  async (_, thunkAPI) => {
    try {
      const { data } = await axios.get("/subscriptions");
      return data;
    } catch (error) {
      toast.error("Failed to load subscriptions");
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const subscribeToAuthor = createAsyncThunk(
  "subscriptions/subscribe",
  async (authorId, thunkAPI) => {
    try {
      const { data } = await axios.post(`/subscriptions/${authorId}`);
      toast.success("Subscribed");
      return data;
    } catch (error) {
      toast.error("Subscription failed");
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const unsubscribeFromAuthor = createAsyncThunk(
  "subscriptions/unsubscribe",
  async (authorId, thunkAPI) => {
    try {
      const { data } = await axios.delete(`/subscriptions/${authorId}`);
      toast.success("Unsubscribed");
      return data;
    } catch (error) {
      toast.error("Unsubscription failed");
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);
