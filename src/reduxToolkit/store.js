import { configureStore } from '@reduxjs/toolkit';
import supplierItemReducer from './supplierItemSlice';

export const store = configureStore({
    reducer: {
        supplierItem: supplierItemReducer,  // Register the supplierItem slice
    },
});
