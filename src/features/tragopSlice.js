import { createAsyncThunk, createSlice, isPending } from '@reduxjs/toolkit';
import { addDoc, arrayUnion, collection, doc, getDoc, getDocs, setDoc, updateDoc } from 'firebase/firestore';
import { data } from 'jquery';
import moment, { months } from 'moment';
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
            title: product.title,
            amountMonth: product.amount,
            totalMonth: product.month,
            items: [],
        };

        const objRef = await addDoc(collection(db, 'tragop'), obj);
        return {
            ...obj,
            id: objRef.id,
        };
    } catch (error) {
        return thunkAPI.rejectWithValue(error.response.data.msg);
    }
});

export const addThangTragop = createAsyncThunk('tragop/addMonth', async (product, thunkAPI) => {
    try {
        const year = moment(product.currentYear, 'YYYY/MM/DD').format('YYYY');
        const month = moment(product.currentYear, 'YYYY/MM/DD').format('M');
        const obj = {
            title: product.data.title,
            amountMonth: product.data.amountMonth,
            totalMonth: product.data.totalMonth,
            items: {
                amount: product.amount,
                month: month,
                year: year,
            },
        };
        const tragopRef = doc(db, 'tragop', product.data.id);

        await updateDoc(tragopRef, {
            title: product.data.title,
            amountMonth: product.data.amountMonth,
            totalMonth: product.data.totalMonth,
            items: arrayUnion({
                amount: product.amount,
                month: month,
                year: year,
            }),
        });
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
        [addThangTragop.pending]: (state) => {
            state.isLoading = true;
        },
        [addThangTragop.fulfilled]: (state, { payload }) => {
            toast.success('Thêm mới thành công!');
            state.isLoading = false;
        },
        [addThangTragop.rejected]: (state) => {
            toast.error('Thêm mới không thành công!');
            state.isLoading = true;
        },
    },
});

export const {} = tragopSlice.actions;
export default tragopSlice.reducer;
