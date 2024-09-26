import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import store, { RootState } from "../store";
import {  getUser } from "../user";
import { AuthState } from "./types";
import instance from "../api";


const initialState: AuthState = {
    accessToken: '',
    isTokenLoading: false
}


export const login = createAsyncThunk(
    'login',
    async ({username, password}: {username: string, password: string}) => {

        try {
            const res = await instance.post(`/login`, { username, password})

            localStorage.setItem('accessToken', res.data);
            store.dispatch(getUser())
        } catch (error) {
            console.log(error);
        }
    }
)

export const registration = createAsyncThunk(
    'registration',
    async ({username, password, email}:{username: string, password: string, email: string}) => {
        try {
            instance.post('/registration', {username: username, password: password, email: email});
        } catch (error) {
           console.log(error);
        }
    }
)
export const logout = createAsyncThunk(
    'logout',
    async (onErrorRedirect?: () => void) => {
        const accessToken = localStorage.getItem('accessToken')
        if(!accessToken){
            console.log('user is not found');
            onErrorRedirect?.()
        }
        const res = await instance.post(`/logout`)
        return res
    }
)
export const checkAuth = createAsyncThunk(
    'check authorization',
    async () =>{
        try {
            const res = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/refresh`, {withCredentials: true})
            localStorage.setItem('accessToken', res.data);
            store.dispatch(getUser())
        } catch (error) {
           console.log(error);
        } 
    }
)


export const authSlice = createSlice({
    name: 'auth',
    initialState: initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(checkAuth.pending, state => {
            state.isTokenLoading = true
        })
        builder.addCase(checkAuth.fulfilled, state => {
            state.isTokenLoading = false
        })
    }
})

export default authSlice.reducer;
export const selectAuthState = (state: RootState) => state.auth