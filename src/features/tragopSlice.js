import { createAsyncThunk, createSlice, isPending } from '@reduxjs/toolkit';
import { collection, doc, getDoc, getDocs, setDoc } from 'firebase/firestore';
import { toast } from 'react-toastify';

import { db } from '../configs/firebase';

const initialState = {
    isLoading: true,
    dailys: [],
    allMonth: [],
    allWeek: [],
    allDailys: {},
    createDate: '',
    isLoadingAll: true,
};

export const getAllTragop = createAsyncThunk('tragop/getAll', async (product, thunkAPI) => {
    try {
        const querySnapshot = await getDocs(collection(db, 'tragop'));
        querySnapshot.forEach((doc) => {
            // doc.data() is never undefined for query doc snapshots
            console.log(doc.id, ' => ', doc.data());
        });
    } catch (error) {
        return thunkAPI.rejectWithValue(error.response.data.msg);
    }
});

export const addTragop = createAsyncThunk('tragop/add', async (product, thunkAPI) => {
    try {
        const obj = {
            title: product.title,
            items: [
                {
                    month: product.month,
                    amount: product.amount,
                },
            ],
        };

        const objRef = doc(db, 'tragop');
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
        [getAllTragop.pending]: (state) => {},
        [getAllTragop.fulfilled]: (state, { payload }) => {},
        [getAllTragop.rejected]: (state) => {
            toast.error('Thêm mới không thành công!');
        },
    },
});

export const {} = tragopSlice.actions;
export default tragopSlice.reducer;
