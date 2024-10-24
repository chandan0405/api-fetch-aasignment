import { createSlice } from '@reduxjs/toolkit';

// Initial state with an empty array to hold supplier and item data
const initialState = {
    submittedData: [], // Array of combined supplier and item records
};

const supplierItemSlice = createSlice({
    name: 'supplierItem',
    initialState,
    reducers: {
        submitData: (state, action) => {
            // Append the new combined data to the submittedData array
            state.submittedData.push(action.payload);
        },
        // Action to add supplier or item data to the array
        addRecord: (state, action) => {
            state.submittedData.push(action.payload);
        },
        // Action to clear all records (optional, for reset purpose)
        clearRecords: (state) => {
            state.submittedData = [];
        },
    },
});

// Export actions to dispatch them
export const { addRecord, clearRecords,submitData } = supplierItemSlice.actions;

// Export the reducer to use in the store
export default supplierItemSlice.reducer;
