import { createAsyncThunk } from '@reduxjs/toolkit';
import api from '../api';

export const getGameServers = createAsyncThunk('get servers', async () => {
  try {
    const res = await api.get(`/servers`);

    return res;
  } catch (error) {
    console.log(error);
  }
});
export const findGameServer = createAsyncThunk('find game server', async () => {
  try {
    const res = await api.get(`/servers/:server`);

    return res;
  } catch (error) {
    console.log(error);
  }
});
