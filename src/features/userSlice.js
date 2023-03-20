import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';
import { signInWithEmailAndPassword, updateProfile, signOut } from 'firebase/auth';

import { auth } from '../configs/firebase';
import { async } from '@firebase/util';

const addUserToLocalStorage = (user) => {
    localStorage.setItem('user', JSON.stringify(user));
};

const getUserFromLocalStorage = () => {
    const result = localStorage.getItem('user');
    const user = result ? JSON.parse(result) : null;
    return user;
};

const removeUserFromLocalStorage = () => {
    localStorage.removeItem('user');
};

const initialState = {
    isLoading: true,
    user: getUserFromLocalStorage(),
};

export const loginUser = createAsyncThunk('users/login', async (user, thunkAPI) => {
    try {
        const { email, password } = user;
        const res = await signInWithEmailAndPassword(auth, email, password);
        return res;
    } catch (error) {
        return thunkAPI.rejectWithValue(error.response.data.msg);
    }
});

export const logOut = createAsyncThunk('user/logout', async (user, thunkAPI) => {
    try {
        const res = await logOut(auth);
        return res;
    } catch (error) {
        return thunkAPI.rejectWithValue(error.response.data.msg);
    }
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
            state.isLoading = false;
            state.user = payload.user;

            if (payload.user.displayName == null) {
                let displayName = 'Ngọc Hòa';
                if (payload.user.email !== 'hoa1881992@gmail.com') {
                    displayName = 'Thùy Vân';
                }
                updateProfile(auth.currentUser, {
                    displayName: displayName,
                });
            }
            addUserToLocalStorage(payload.user);
        },
        [loginUser.rejected]: (state, { payload }) => {
            state.isLoading = false;
            toast.error('Incorrect username or password.');
        },
        [logOut.pending]: (state) => {
            state.isLoading = true;
        },
        [logOut.fulfilled]: (state, { payload }) => {
            state.isLoading = false;
            removeUserFromLocalStorage();
        },
        [logOut.rejected]: (state) => {
            state.isLoading = false;
        },
    },
});

export const {} = userSlice.actions;
export default userSlice.reducer;
