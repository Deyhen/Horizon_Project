/* eslint-disable @typescript-eslint/no-unused-vars */
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { RootState } from '../store';
import { User, UserState } from './types';
import {
  login,
  signup,
  changeAvatar,
  changeCape,
  changeSkin,
  changePassword,
  checkUser,
  logout,
  resetPassword,
  getUser,
} from '@/src/api';

// const initialUser: User = {
//   id: '123',
//   username: 'test',
//   email: 'test@test.com',
//   password: '123',
//   isActivated: false,
//   role: 'admin',
//   gameCurrency: 100,
//   donateCurrency: 10,
//   capePath: '',
//   skinPath: '',
//   avatarPath: '',
// };
const initialUser: User = {
  id: '',
  username: '',
  email: '',
  password: '',
  isActivated: false,
  role: 'user',
  gameCurrency: 0,
  donateCurrency: 0,
  capePath: '',
  skinPath: '',
  avatarPath: '',
};
const initialState: UserState = {
  data: initialUser,
  loading: false,
  loginError: '',
  signupError: '',
};

export const userSlice = createSlice({
  name: 'user',
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(login.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(login.fulfilled, (state, action: PayloadAction<User>) => {
      state.data = action.payload;
      state.loading = false;
      state.loginError = '';
    });
    builder.addCase(login.rejected, (state, action) => {
      state.loading = false;
      state.loginError = action.payload as string;
    });
    builder.addCase(signup.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(signup.fulfilled, (state, action: PayloadAction<User>) => {
      state.data = action.payload;
      state.loading = false;
      state.signupError = '';
    });
    builder.addCase(signup.rejected, (state, action) => {
      state.loading = false;
      state.signupError = action.payload as string;
    });
    builder.addCase(logout.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(logout.fulfilled, (state) => {
      localStorage.removeItem('accessToken');
      state.loading = false;
      state.data = initialUser;
    });
    builder.addCase(logout.rejected, (state, action) => {
      state.loading = false;
    });
    builder.addCase(checkUser.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(checkUser.fulfilled, (state, action: PayloadAction<User>) => {
      state.data = action.payload;
      state.loading = false;
    });
    builder.addCase(checkUser.rejected, (state, action) => {
      state.loading = false;
    });
    builder.addCase(resetPassword.fulfilled, (state, action: PayloadAction<User>) => {
      state.data = action.payload;
    });
    builder.addCase(resetPassword.rejected, (state, action) => {
      console.log(action.error);
    });
    builder.addCase(getUser.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(getUser.fulfilled, (state, action) => {
      state.data = action.payload.data as User;
      state.loading = false;
    });
    builder.addCase(getUser.rejected, (state, action) => {
      console.log(action.error);
      state.loading = false;
    });
    builder.addCase(changeAvatar.fulfilled, (state, action) => {
      state.data.avatarPath = action.payload.data;
    });
    builder.addCase(changeCape.fulfilled, (state, action) => {
      state.data.capePath = action.payload.data;
    });
    builder.addCase(changeSkin.fulfilled, (state, action) => {
      state.data.skinPath = action.payload.data;
    });
    builder.addCase(changeCape.rejected, (state, action) => {
      console.log(action);
    });
    builder.addCase(changeSkin.rejected, (state, action) => {
      console.log(action);
    });
  },
});

export const selectUserState = (state: RootState) => state.user;
export default userSlice.reducer;
