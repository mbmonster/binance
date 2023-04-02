import { configureStore } from '@reduxjs/toolkit';
import useReducer from './features/userSlice';
import dataReducer from './features/dataSlice';
import tragopReducer from './features/tragopSlice';

export const store = configureStore({
    reducer: { user: useReducer, data: dataReducer, tragop: tragopReducer },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: false,
        }),
});
