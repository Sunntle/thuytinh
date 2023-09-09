import {createSlice} from "@reduxjs/toolkit";

const customerNameSlice = createSlice({
    name: 'customer-name',
    initialState: null,
    reducers: {
        getCustomerName: (state, action) => {
            state = action.payload
            return state
        }
    }
})

export const { getCustomerName } = customerNameSlice.actions
export const customerNameReducer = customerNameSlice.reducer