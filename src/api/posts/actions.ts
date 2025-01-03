import api from '../api';
import { createAsyncThunk } from '@reduxjs/toolkit';

export const getPosts = createAsyncThunk('get posts', async (_, { rejectWithValue }) => {
  try {
    const res = await api.get(`/posts`);
    return res;
  } catch (error) {
    return rejectWithValue(error);
  }
});
export const findPost = createAsyncThunk(
  'get one nes by id',
  async (id: string, { rejectWithValue }) => {
    try {
      const res = await api.get(`/posts/${id}`);

      return res;
    } catch (error) {
      return rejectWithValue(error);
    }
  },
);
export const createPost = createAsyncThunk(
  'create post',
  async (formData: FormData, { rejectWithValue }) => {
    try {
      const res = await api.post(`/posts`, formData);
      return res;
    } catch (error) {
      return rejectWithValue(error);
    }
  },
);
export const deletePost = createAsyncThunk(
  'delete post',
  async (id: string, { rejectWithValue }) => {
    try {
      const res = await api.delete(`/posts/${id}`);

      return res;
    } catch (error) {
      return rejectWithValue(error);
    }
  },
);
