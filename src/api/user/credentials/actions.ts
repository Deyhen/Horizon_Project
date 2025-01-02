import axios, { AxiosError, AxiosResponse } from 'axios';
import { getUser } from '../auth';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { UserResponse } from '@/src/store/user/types';

export const forgotPassword = createAsyncThunk(
  'forgot password',
  async (email: string, { rejectWithValue }) => {
    try {
      await axios.post(`${process.env.NEXT_PUBLIC_BACKEND_URL}/forgot-password`, { email });
      return;
    } catch (error) {
      const e = error as AxiosError<any>;
      return rejectWithValue(e.response?.data.message);
    }
  },
);
export const checkResetToken = createAsyncThunk(
  'check reset token',
  async (token: string, { rejectWithValue }) => {
    try {
      console.log(token);
      const res = await axios.get(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/reset-password/chek/${token}`,
      );
      return res;
    } catch (error) {
      const e = error as AxiosError<any>;
      return rejectWithValue(e.response?.data.message);
    }
  },
);

export const resetPassword = createAsyncThunk(
  'reset password',
  async ({ password, token }: { password: string; token: string }, { rejectWithValue }) => {
    try {
      const res = (await axios.post(`${process.env.NEXT_PUBLIC_BACKEND_URL}/reset-password/`, {
        password,
        token,
      })) as AxiosResponse<UserResponse>;
      localStorage.setItem('accessToken', res.data.accessToken);

      return res.data.user;
    } catch (error) {
      const e = error as AxiosError<any>;
      return rejectWithValue(e.response?.data.message);
    }
  },
);
export const activateEmail = createAsyncThunk(
  'send email activation code',
  async (args, { rejectWithValue }) => {
    try {
      const res = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/activate-email`);
      return res;
    } catch (error) {
      const e = error as AxiosError<any>;
      return rejectWithValue(e.response?.data.message);
    }
  },
);
export const changeUsername = createAsyncThunk(
  'set new username',
  async (newUsername: string, { rejectWithValue, dispatch }) => {
    try {
      const res = await axios.put(`${process.env.NEXT_PUBLIC_BACKEND_URL}/change-username`, {
        newUsername,
      });
      dispatch(getUser());
      return res;
    } catch (error) {
      const e = error as AxiosError<any>;
      return rejectWithValue(e.response?.data.message);
    }
  },
);
export const changePassword = createAsyncThunk(
  'set new password',
  async (
    { currentPassword, newPassword }: { currentPassword: string; newPassword: string },
    { rejectWithValue, dispatch },
  ) => {
    try {
      const res = await axios.put(`${process.env.NEXT_PUBLIC_BACKEND_URL}/change-password`, {
        currentPassword,
        newPassword,
      });
      dispatch(getUser());
      return res;
    } catch (error) {
      const e = error as AxiosError<any>;
      return rejectWithValue(e.response?.data.message);
    }
  },
);
