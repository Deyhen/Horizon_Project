import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import store, { RootState, useAppDispatch } from "../store";
import { cleanUser, getUser } from "../user";
import { AuthState } from "./types";
import instance from "../api";

const initialState: AuthState = {
    accessToken: '',
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
        const res = await instance.put(`/logout`)
        store.dispatch(cleanUser())
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
})
export default authSlice.reducer;
export const selectAuthState = (state: RootState) => state.auth