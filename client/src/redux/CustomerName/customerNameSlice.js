import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "../../utils/axiosConfig";

const initialState = {
  name: "",
  tables: [],
  timestamp: null,
  isLoading: false,
  message: ""
};
export const initTable = createAsyncThunk(
  "customer-name/initTable",
  async (_, { rejectWithValue }) => {
    const token = localStorage.getItem("tableToken");
    if (token) {
      const response = await axios.get(`/table/current-table?token=${token}`)
      if (response.message) return rejectWithValue(response.message)
      return response
    }
    return initialState;
  },
);
const customerNameSlice = createSlice({
  name: "customer-name",
  initialState: initialState,
  reducers: {
    getCustomerName: (state, action) => {
      state.name = action.payload.name;
      state.tables = action.payload.tables;
      state.timestamp = action.payload.timestamp;
    },
    clearCustomer: (state) => {
      state.name = initialState.name
      state.tables = initialState.tables;
      state.timestamp = initialState.timestamp;
    },
    resetTablesStore: () => {
      localStorage.removeItem("tableToken")
      return initialState
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(initTable.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(initTable.rejected, (state, action) => {
        state.isLoading = false;
        state.message = action.payload
      })
      .addCase(initTable.fulfilled, (state, action) => {
        state.isLoading = false;
        state.name = action.payload.name;
        state.tables = action.payload.tables;
        state.timestamp = action.payload.timestamp;
      });
  },
});

export const { getCustomerName, clearCustomer, resetTablesStore } = customerNameSlice.actions;
export const customerNameReducer = customerNameSlice.reducer;
