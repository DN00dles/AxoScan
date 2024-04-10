import { configureStore } from "@reduxjs/toolkit";
import receiptReducer from './slices/receiptSlice.js'

export const store = configureStore({
    reducer: {
        receipt: receiptReducer,
    },
});



