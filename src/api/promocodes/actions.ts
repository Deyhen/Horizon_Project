import { createAsyncThunk } from '@reduxjs/toolkit';
import axios, { AxiosError } from 'axios';
import { getUser } from '../user';

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
      const res = await axios.post(`${process.env.NEXT_PUBLIC_BACKEND_URL}/add-promocodes`, {
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
      const res = await axios.get(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/activate-promocode/${promocode}`,
      );
      dispatch(getUser());
      return res;
    } catch (error) {
      const e = error as AxiosError<any>;
      return rejectWithValue(e.response?.data.message);
    }
  },
);
