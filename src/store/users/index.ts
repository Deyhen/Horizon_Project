import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { UsersState } from "./types";
import axios from "axios";
import { RootState } from "../store";
import instance from "../api";

const initialState: UsersState = {
    data: []
}

export const getUsers = createAsyncThunk(
    'get users',
    async () => {
        try {
            const res = await instance.get(`/users`)
            return res
        } catch (error) {
            console.log(error);
        }
    }
)

export const usersSlice = createSlice({
    name: 'users',
    initialState: initialState,
    reducers: {},
    extraReducers: builder => {
        builder.addCase(getUsers.fulfilled, (state, action) => {
            state.data = action.payload?.data
        })
       
    }
})
export default usersSlice.reducer;
export const selectUsersState = (state: RootState) => state.users