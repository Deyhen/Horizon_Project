import {createSlice, PayloadAction } from "@reduxjs/toolkit";
import  { AxiosError } from "axios";
import  { RootState } from "../store";
import { User, UserState } from "./types";
import { checkUser, login, logout, signup } from "./actions";

const initialUser: User = {
    id: '',
    username: '',
    email: '',
    password: '',
    isActivated: false,
    role: 'user',
    gameCurrency: 0,
    donateCurrency: 0
}
const initialState: UserState = {
    data: initialUser,
    loading: true,
    emailConfirmation: false,
    loginError: '',
    signupError: ''
}



export const userSlice = createSlice({
    name: 'user',
    initialState: initialState,
    reducers: {},
    extraReducers: (builder) => {
        // builder.addCase(checkAuth.pending, state => {
        //     state.isTokenLoading = true
        // })
        // builder.addCase(checkAuth.fulfilled, state => {
        //     state.isTokenLoading = false
        // })
        builder.addCase(login.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(login.fulfilled, (state, action: PayloadAction<User>) => {
            state.data = action.payload;
            state.loading = false;
            state.loginError = ''
        });
        builder.addCase(login.rejected, (state, action) => {
            state.loading = false;
            state.loginError = action.payload as string
            
        });
        builder.addCase(signup.pending, (state) => {
            state.loading = true
        });
        builder.addCase(signup.fulfilled, (state, action: PayloadAction<User>) => {
            state.data = action.payload;
            state.loading = false;
            state.signupError = ''
        });
        builder.addCase(signup.rejected, (state, action) => {
            state.loading = false;
            state.signupError = action.payload as string
        });
        builder.addCase(logout.pending, (state) =>{
            state.loading = true
        })
        builder.addCase(logout.fulfilled, (state) => {
            localStorage.removeItem('accessToken')
            state.loading = false
            state.data = initialUser;
        });
        builder.addCase(logout.rejected, (state, action) => {
            state.loading = false
        });
        builder.addCase(checkUser.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(checkUser.fulfilled, (state, action: PayloadAction<User>) => {
                state.data = action.payload;
                state.loading = false;
            }
        );
        builder.addCase(checkUser.rejected, (state, action) => {
            state.loading = false
        })
    },
})

export const selectUserState = (state: RootState) => state.user
export default userSlice.reducer;