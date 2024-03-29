import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';
import moment from 'moment';
import {
    arrayRemove,
    arrayUnion,
    collection,
    doc,
    documentId,
    getDoc,
    getDocs,
    or,
    query,
    setDoc,
    updateDoc,
    where,
} from 'firebase/firestore';

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

export const getAllDailys = createAsyncThunk('daily/getAll', async (product, thunkAPI) => {
    try {
        const startOfMonth = moment().startOf('month').format('YYYYMMDD');
        const endOfMonth = moment().endOf('month').format('YYYYMMDD');

        const startOfWeek = moment().utc().startOf('isoWeek').format('YYYYMMDD');
        const endOfWeek = moment().utc().endOf('isoWeek').format('YYYYMMDD');

        const currentDate = moment().format('YYYYMMDD');

        const q = query(
            collection(db, 'dailys'),
            or(where(documentId(), '>=', startOfMonth), where(documentId(), '<=', endOfMonth)),
        );
        let arrDataMonth = [];
        let arrDataWeek = [];
        let arrDataDaily = [];
        const querySnapshot = await getDocs(q);
        querySnapshot.forEach((doc) => {
            // doc.data() is never undefined for query doc snapshots
            var obj = {
                createDate: doc.id,
                ...doc.data(),
            };
            if (doc.id >= startOfMonth && doc.id <= endOfMonth) {
                arrDataMonth.push(obj);
            }
            if (doc.id >= startOfWeek && doc.id <= endOfWeek) {
                arrDataWeek.push(obj);
            }

            if (doc.id === currentDate) {
                arrDataDaily = obj;
            }
        });
        return { dataOfMonth: arrDataMonth, dataOfWeek: arrDataWeek, dataOfDaily: arrDataDaily };
    } catch (error) {
        return thunkAPI.rejectWithValue(error.response.data.msg);
    }
});

export const addDaily = createAsyncThunk('daily/add', async (product, thunkAPI) => {
    try {
        const newDate = moment(product.currentDate).format('YYYYMMDD');
        const newDatetime = moment(product.currentDate).format('YYYYMMDDHHmmss');
        const obj = {
            items: [
                {
                    type: product.type,
                    amount: product.amount,
                    kind: product.kind,
                    createDate: newDatetime,
                    parentId: newDate,
                    typeAmount: product.typeAmount,
                },
            ],
        };
        const objDailys = thunkAPI.getState().data.dailys;

        if (objDailys.length === 0) {
            const objRef = doc(db, 'dailys', newDate);
            setDoc(objRef, obj);
        } else {
            const objRef = doc(db, 'dailys', newDate);
            await updateDoc(objRef, {
                items: arrayUnion({
                    type: product.type,
                    amount: product.amount,
                    kind: product.kind,
                    createDate: newDatetime,
                    parentId: newDate,
                    typeAmount: product.typeAmount,
                }),
            });
        }
        thunkAPI.dispatch(getDaily(product.currentDate));
        thunkAPI.dispatch(getAllDailys());
        return obj;
    } catch (error) {
        return thunkAPI.rejectWithValue(error.response.data.msg);
    }
});

export const getDaily = createAsyncThunk('daily/get', async (product, thunkAPI) => {
    try {
        const newDate = moment(product).format('YYYYMMDD');
        const docRef = doc(db, 'dailys', newDate);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
            return docSnap.data();
        } else {
            return [];
        }
    } catch (error) {
        return thunkAPI.rejectWithValue(error.response.data.msg);
    }
});

export const deleteDaily = createAsyncThunk('daily/delete', async (product, thunkAPI) => {
    try {
        const newDate = moment(product.currentDate).format('YYYYMMDD');
        const docRef = doc(db, 'dailys', newDate);
        const obj = {
            amount: product.amount,
            createDate: product.createDate,
            kind: product.kind,
            type: product.type,
            parentId: product.parentId,
            typeAmount: product.typeAmount,
        };
        await updateDoc(docRef, {
            items: arrayRemove(obj),
        });
        thunkAPI.dispatch(getDaily(product.currentDate));
        thunkAPI.dispatch(getAllDailys());
        return obj;
    } catch (error) {
        return thunkAPI.rejectWithValue(error.response.data.msg);
    }
});

const dataSlice = createSlice({
    name: 'data',
    initialState,
    reducers: {},
    extraReducers: {
        [addDaily.pending]: (state) => {
            state.isLoading = true;
            state.isLoadingAll = true;
        },
        [addDaily.fulfilled]: (state, { payload }) => {
            state.dailys = payload;
            state.isLoadingAll = false;
            state.isLoading = false;
            toast.success('Thêm mới thành công!');
        },
        [addDaily.rejected]: (state) => {
            toast.error('Thêm mới không thành công!');
        },
        [getDaily.pending]: (state) => {
            state.isLoading = true;
        },
        [getDaily.fulfilled]: (state, { payload }) => {
            state.dailys = payload;
            state.isLoading = false;
        },
        [getDaily.rejected]: (state) => {
            toast.error('Có lỗi xảy ra!');
        },
        [deleteDaily.pending]: (state) => {
            state.isLoading = true;
            state.isLoadingAll = true;
        },
        [deleteDaily.fulfilled]: (state, { payload }) => {
            state.dailys = payload;
            state.isLoadingAll = false;
            state.isLoading = false;
            toast.success('Xóa thành công!');
        },
        [deleteDaily.rejected]: (state) => {
            toast.error('Xóa không thành công!');
        },
        [getAllDailys.pending]: (state) => {
            state.isLoadingAll = true;
        },
        [getAllDailys.fulfilled]: (state, { payload }) => {
            state.allMonth = payload.dataOfMonth;
            state.allWeek = payload.dataOfWeek;
            state.allDailys = payload.dataOfDaily;
            state.isLoadingAll = false;
        },
        [getAllDailys.rejected]: (state) => {
            toast.error('Có lỗi xảy ra!');
        },
    },
});

export const {} = dataSlice.actions;
export default dataSlice.reducer;
