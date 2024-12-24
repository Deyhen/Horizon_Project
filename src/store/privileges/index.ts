import { createSlice } from '@reduxjs/toolkit';
import { RootState } from '../store';
import { DataState, PrivilegesState, PrivilegeState } from './types';

const initialPrivileges: PrivilegeState[] = [
  {
    name: 'VIP',
    responsobilities: ['feed', 'keepinventory'],
    imageName: 'VIPExample.jpeg',
    cost: 100,
    privateCount: 3,
    privateSize: 100,
  },
  {
    name: 'Delux',
    responsobilities: ['feed', 'keepinventory', 'fly'],
    imageName: 'VIPExample.jpeg',
    cost: 250,
    privateCount: 5,
    privateSize: 150,
  },
  {
    name: 'God',
    responsobilities: ['fly', 'feed', 'keepinventory', 'god'],
    imageName: 'VIPExample.jpeg',
    cost: 500,
    privateCount: 10,
    privateSize: 200,
  },
];

const initialData: DataState = {
  privileges: initialPrivileges,
  generalResponsibilities: ['fly', 'feed', 'keepinventory', 'god'],
};

const initialState: PrivilegesState = {
  data: initialData,
  loading: false,
};

export const privilegesSlice = createSlice({
  name: 'privileges',
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {},
});
export default privilegesSlice.reducer;
export const selectServersState = (state: RootState) => state.privileges;
