import { LoginArgs, RegistrationArgs, UserResponse } from '@/src/store/user/types';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { AxiosError, AxiosResponse } from 'axios';
import api from '../../api';

export const getUser = createAsyncThunk('get user', async (args, { rejectWithValue }) => {
  try {
    const res = await api.get(`/users/user`);
    return res;
  } catch (error) {
    return rejectWithValue(error);
  }
});

export const login = createAsyncThunk('login', async (data: LoginArgs, { rejectWithValue }) => {
  try {
    const res = (await api.post(`/login`, {
      ...data,
    })) as AxiosResponse<UserResponse>;
    localStorage.setItem('accessToken', res.data.accessToken);
    return res.data.user;
  } catch (error) {
    const e = error as AxiosError<any>;
    return rejectWithValue(e.response?.data.message);
  }
});

export const signup = createAsyncThunk(
  'signup',
  async (data: RegistrationArgs, { rejectWithValue }) => {
    try {
      const res = await api.post(`/registration`, {
        ...data,
      });
      localStorage.setItem('accessToken', res.data.accessToken);
      return res.data.user;
    } catch (error) {
      const e = error as AxiosError<any>;
      return rejectWithValue(e.response?.data.message);
    }
  },
);
export const logout = createAsyncThunk('logout', async (arg, { rejectWithValue }) => {
  try {
    const res = await api.post(`/logout`);
    return res;
  } catch (error) {
    return rejectWithValue(error);
  }
});
export const checkUser = createAsyncThunk(
  'check authorization',
  async (arg, { rejectWithValue }) => {
    try {
      const res = await api.get(`/refresh`);
      localStorage.setItem('accessToken', res.data.accessToken);
      return res.data.user;
    } catch (error) {
      const e = error as AxiosError<any>;
      return rejectWithValue(e.response?.data.message);
    }
  },
);
