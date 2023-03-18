import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';

import request from '../request';

const addUserToLocalStorage = (user) => {
    localStorage.setItem('user', JSON.stringify(user));
};

const initialState = {
    isLoading: false,
    isSidebarOpen: false,
    user: null,
    remember: false,
};

export const loginUser = createAsyncThunk('users/login', async (user, thunkAPI) => {
    // try {
    //     const res = await request.post('/users/login', user);
    //     return res.data;
    // } catch (error) {}
    return user;
});

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {},
    extraReducers: {
        [loginUser.pending]: (state) => {
            state.isLoading = true;
        },
        [loginUser.fulfilled]: (state, { payload }) => {
            if (payload.username === 'admin' && payload.password === 'admin') {
                state.isLoading = false;
                state.user = payload;
                addUserToLocalStorage(payload);
            } else {
                toast.error('Incorrect username or password.');
            }
        },
        [loginUser.rejected]: (state, { payload }) => {
            state.isLoading = false;
        },
    },
});

export const {} = userSlice.actions;
export default userSlice.reducer;
