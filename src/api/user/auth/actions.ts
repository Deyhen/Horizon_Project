import { LoginArgs, RegistrationArgs, UserResponse } from '@/src/store/user/types';
import { createAsyncThunk } from '@reduxjs/toolkit';
import axios, { AxiosError, AxiosResponse } from 'axios';

export const getUser = createAsyncThunk('get user', async (args, { rejectWithValue }) => {
  try {
    const res = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/users/user`);
    return res;
  } catch (error) {
    return rejectWithValue(error);
  }
});

export const login = createAsyncThunk('login', async (data: LoginArgs, { rejectWithValue }) => {
  try {
    const res = (await axios.post(`${process.env.NEXT_PUBLIC_BACKEND_URL}/login`, {
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
      const res = await axios.post(`${process.env.NEXT_PUBLIC_BACKEND_URL}/registration`, {
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
    const res = await axios.post(`${process.env.NEXT_PUBLIC_BACKEND_URL}/logout`);
    return res;
  } catch (error) {
    return rejectWithValue(error);
  }
});
export const checkUser = createAsyncThunk(
  'check authorization',
  async (arg, { rejectWithValue }) => {
    try {
      const res = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/refresh`);
      localStorage.setItem('accessToken', res.data.accessToken);
      return res.data.user;
    } catch (error) {
      const e = error as AxiosError<any>;
      return rejectWithValue(e.response?.data.message);
    }
  },
);
