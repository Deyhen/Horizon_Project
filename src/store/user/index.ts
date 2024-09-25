
import  { RootState, } from "../store";
import { User, UserState } from "./types";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import instance from "../api";


const initialUser: User = {
    username: '',
    id: '',
    email: '',
    password: '',
    twoFA: false
}

const initialState: UserState = {
    data: initialUser
}

export const getUser = createAsyncThunk(
    'get user',
    async (onErrorRedirect?: () => void) => {
        try {
            const accessToken = localStorage.getItem('accessToken')
            
            if(!accessToken){
                console.log('user is not found');
                onErrorRedirect?.()
            }
            const res = await instance.get(`/users/user`,
            {headers: {
                'Authorization': 'Bearer ' + accessToken
            }})
            return res
        } catch (error) {
            console.log(error);
        }
    }
)
export const userSlice = createSlice({
    name: 'user',
    initialState: initialState,
    reducers: {
        cleanUser: state => {
            state.data = initialUser;
            localStorage.removeItem('accessToken');
            // store.dispatch(logout())
      }},
    extraReducers: builder => {
        builder.addCase(getUser.fulfilled, (state, action) => {
            state.data = action.payload?.data
        })
    }
})
export const {
    cleanUser
  } = userSlice.actions;
export default userSlice.reducer;
export const selectUserState = (state: RootState) => state.user
