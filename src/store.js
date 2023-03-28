import { configureStore } from '@reduxjs/toolkit';
import useReducer from './features/userSlice';
import dataReducer from './features/dataSlice';

export const store = configureStore({
    reducer: { user: useReducer, data: dataReducer },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: false,
        }),
});
