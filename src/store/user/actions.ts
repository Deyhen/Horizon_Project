import { createAsyncThunk } from "@reduxjs/toolkit";
import axios, { AxiosError, AxiosResponse } from "axios";
// import store  from "../store";
// import {  getUser } from "../user";

import instance from "../../shared/api";
import { createThunkWithCallbacks } from "@/src/shared/createThunkWithCallbacks";
import { LoginArgs, RegistrationArgs, UserResponse } from "./types";

export const login = createAsyncThunk(
    'login',
    async (data: LoginArgs, {rejectWithValue}) => {
        try {
            const res = (await instance.post(`/login`, { ...data})) as AxiosResponse<UserResponse>
            localStorage.setItem('accessToken', res.data.accessToken);
            
            return res.data.user
        } catch (error) {
            const e = error as AxiosError<any>
            console.log(e);
            return rejectWithValue(e.response?.data.message)
        }
    }
)

export const signup = createAsyncThunk(
    'signup',
    async (data: RegistrationArgs, {rejectWithValue}) => {
        try{
        const res = await instance.post('/registration', {...data});
        localStorage.setItem('accessToken', res.data.token);
        return res.data.user
        } catch (error) {
            const e = error as AxiosError<any>
            console.log(e);
            return rejectWithValue(e.response?.data.message)
        }
    }
)
export const logout = createAsyncThunk(
    'logout',
    async (arg, {rejectWithValue}) => {
        try {
            const res = await instance.post(`/logout`, )
            return res
        } catch (error) {
            return rejectWithValue(error)
        }
    }
)
export const checkUser = createAsyncThunk(
    'check authorization',
    async (arg, {rejectWithValue}) =>{

        try {
            const res = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/refresh`, {withCredentials: true})
            localStorage.setItem('accessToken', res.data.token);
            return res.data.user
        } catch (error) {
            const e = error as AxiosError<any>
            console.log(e);
            return rejectWithValue(e)
        }

    }
)