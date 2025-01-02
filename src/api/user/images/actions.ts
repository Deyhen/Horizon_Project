import { createAsyncThunk } from '@reduxjs/toolkit';
import instance from '../../api';
import { AxiosError } from 'axios';

export const changeSkin = createAsyncThunk(
  'change skin',
  async (formData: FormData, { rejectWithValue }) => {
    try {
      const res = await instance.put(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/change-skin`,
        formData,
      );
      return res;
    } catch (error) {
      const e = error as AxiosError<any>;
      return rejectWithValue(e.response?.data.message);
    }
  },
);
export const changeAvatar = createAsyncThunk(
  'change avatar',
  async (formData: FormData, { rejectWithValue }) => {
    try {
      const res = await instance.put(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/change-avatar`,
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        },
      );

      return res;
    } catch (error) {
      const e = error as AxiosError<any>;
      return rejectWithValue(e.response?.data.message);
    }
  },
);
export const changeCape = createAsyncThunk(
  'change cape',
  async (formData: FormData, { rejectWithValue }) => {
    try {
      const res = await instance.put(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/change-cape`,
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        },
      );
      return res;
    } catch (error) {
      const e = error as AxiosError<any>;
      return rejectWithValue(e.response?.data.message);
    }
  },
);
