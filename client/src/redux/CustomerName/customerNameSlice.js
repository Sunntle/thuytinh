import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import * as jose from 'jose';
const initialState={
    name: "",
    tables: null,
    timestamp: null,
    isLoading: true
}
export const initTable = createAsyncThunk('customer-name/initTable', async (defaultValue) => {
    const token = localStorage.getItem("tableToken")
    const decodeData = await jose.decodeJwt(token,"table")
    const data = decodeData !== undefined ? decodeData : defaultValue
    if(data) return data
    return 
})
const customerNameSlice = createSlice({
    name: 'customer-name',
    initialState: initialState,
    reducers: {
        getCustomerName: (state, action) => {
            state.name = action.payload.name
            state.tables = action.payload.tables
            state.timestamp = action.payload.timestamp
            console.log("action", action.payload);
        }
    },
    extraReducers: builder => {
        builder
            .addCase(initTable.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(initTable.rejected, (state) => {
                state.isLoading = false;
            })
            .addCase(initTable.fulfilled, (state,action) => {
                state.isLoading = false;
                state.name = action.payload.name
                state.tables = action.payload.tables[0]
                state.timestamp = action.payload.timestamp
            })
        }

})

export const { getCustomerName } = customerNameSlice.actions
export const customerNameReducer = customerNameSlice.reducer