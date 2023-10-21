import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
// import jwt from 'jsonwebtoken';

const initialState={
    name: "",
    tables: [0],
    timestamp: null,
    isLoading: true,
    error: null
}
export const initTable = createAsyncThunk('customer-name/initTable', async (defaultValue) => {
    // const token = localStorage.getItem("tableToken")
    // const decodeData = jwt.decode(token)
    const decodeData = undefined
    const data = decodeData !== undefined ? decodeData : defaultValue
    if(data) return data
    return initialState
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
                state.error = "Something wrong"
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