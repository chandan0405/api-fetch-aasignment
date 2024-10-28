import { createSlice } from '@reduxjs/toolkit';

// Initial state with an empty array to hold supplier and item data
const initialState = {
    submittedData: [], // Array of combined supplier and item records
};

const supplierItemSlice = createSlice({
    name: 'supplierItem',
    initialState,
    reducers: {
        // Action to add item data
        submitItemData: (state, action) => {
            state.submittedData.push({ itemData: action.payload, supplierData: null });
        },

        // Action to add supplier data to the last item in submittedData
        submitSupplierData: (state, action) => {
            const lastEntryIndex = state.submittedData.length - 1;
            if (lastEntryIndex >= 0 && state.submittedData[lastEntryIndex].supplierData === null) {
                // Update the supplier data for the existing item entry
                state.submittedData[lastEntryIndex].supplierData = action.payload;
                // store the all data to the localStorage
                const existingEntries = JSON.parse(localStorage.getItem('itemSupplierData')) || [];
                existingEntries.push(state.submittedData[lastEntryIndex]);
                localStorage.setItem('itemSupplierData', JSON.stringify(existingEntries));
            } else {
                console.warn("No item data found to associate with supplier data");
            }
        },

        // Clear all records if needed
        clearRecords: (state) => {
            state.submittedData = [];
        },
    },
});

// Export actions to dispatch them
export const { submitItemData, submitSupplierData, clearRecords } = supplierItemSlice.actions;

// Export the reducer to use in the store
export default supplierItemSlice.reducer;
