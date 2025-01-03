import { createAsyncThunk } from '@reduxjs/toolkit';
import { AxiosError } from 'axios';
import { getUser } from '../user';
import api from '../api';

export const addPromocodes = createAsyncThunk(
  'add new promocodes',
  async (
    {
      name,
      gameCurrencyBonus,
      donateCurrencyBonus,
      amount,
    }: { name: string; gameCurrencyBonus: number; donateCurrencyBonus: number; amount: number },
    { rejectWithValue },
  ) => {
    try {
      const payload = { name, gameCurrencyBonus, donateCurrencyBonus, amount };
      const res = await api.post(`/add-promocodes`, {
        payload,
      });
      return res;
    } catch (error) {
      const e = error as AxiosError<any>;
      return rejectWithValue(e.response?.data.message);
    }
  },
);
export const activatePromocode = createAsyncThunk(
  'activate promocode',
  async (promocode: string, { rejectWithValue, dispatch }) => {
    try {
      const res = await api.get(`/activate-promocode/${promocode}`);
      dispatch(getUser());
      return res;
    } catch (error) {
      const e = error as AxiosError<any>;
      return rejectWithValue(e.response?.data.message);
    }
  },
);
