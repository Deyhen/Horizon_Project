import { createAsyncThunk } from '@reduxjs/toolkit';
import instance from '../../api/api';

export const getUsers = createAsyncThunk('get users', async () => {
  const res = await instance.get(`/users`);
  return res;
});
