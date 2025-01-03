import { createAsyncThunk } from '@reduxjs/toolkit';
import api from '../api';

export const getUsers = createAsyncThunk('get users', async () => {
  const res = await api.get(`/users`);
  return res;
});
