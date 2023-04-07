import { createAsyncThunk, createSlice, isPending } from '@reduxjs/toolkit';
import { collection, doc, getDoc, getDocs, setDoc } from 'firebase/firestore';
import { toast } from 'react-toastify';

import { db } from '../configs/firebase';

const initialState = {
    isLoading: true,
    tragop: [],
    allMonth: [],
    allWeek: [],
    allDailys: {},
    createDate: '',
    isLoadingAll: true,
};

export const getAllTragop = createAsyncThunk('tragop/getAll', async (product, thunkAPI) => {
    try {
        const querySnapshot = await getDocs(collection(db, 'tragop'));
        let arrData = [];
        querySnapshot.forEach((doc) => {
            // doc.data() is never undefined for query doc snapshots
            const obj = {
                id: doc.id,
                ...doc.data(),
            };
            arrData.push(obj);
        });

        return arrData;
    } catch (error) {
        return thunkAPI.rejectWithValue(error.response.data.msg);
    }
});

export const addTragop = createAsyncThunk('tragop/add', async (product, thunkAPI) => {
    try {
        const obj = {
            title: product,
            items: [],
        };

        const objRef = doc(collection(db, 'tragop'));
        setDoc(objRef, obj);
        return obj;
    } catch (error) {
        return thunkAPI.rejectWithValue(error.response.data.msg);
    }
});

const tragopSlice = createSlice({
    name: 'tragop',
    initialState,
    reducers: {},
    extraReducers: {
        [getAllTragop.pending]: (state) => {
            state.isLoading = true;
        },
        [getAllTragop.fulfilled]: (state, { payload }) => {
            state.isLoading = false;
            state.tragop = payload;
        },
        [getAllTragop.rejected]: (state) => {
            state.isLoading = true;
        },
        [addTragop.pending]: (state) => {
            state.isLoading = true;
        },
        [addTragop.fulfilled]: (state, { payload }) => {
            toast.success('Thêm mới thành công!');
            state.isLoading = false;
            state.tragop = payload;
        },
        [addTragop.rejected]: (state) => {
            toast.error('Thêm mới không thành công!');
            state.isLoading = true;
        },
    },
});

export const {} = tragopSlice.actions;
export default tragopSlice.reducer;
