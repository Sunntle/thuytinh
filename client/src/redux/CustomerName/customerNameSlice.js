import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import useHttp from "../../hooks/useHttp";

const initialState = {
  name: "",
  tables: [],
  timestamp: null,
  isLoading: false,
};
export const initTable = createAsyncThunk(
  "customer-name/initTable",
  async () => {
    const token = localStorage.getItem("tableToken");
    if(token){
      const {sendRequest} = useHttp()
      let response;
      await sendRequest({
        url: `table/current-table?token=${token}`,
        method: "get",
      }, response)
      console.log(response);
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
      console.log("action", action.payload);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(initTable.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(initTable.rejected, (state) => {
        state.isLoading = false;
      })
      .addCase(initTable.fulfilled, (state, action) => {
        state.isLoading = false;
        state.name = action.payload.name;
        state.tables = action.payload.tables[0];
        state.timestamp = action.payload.timestamp;
      });
  },
});

export const { getCustomerName } = customerNameSlice.actions;
export const customerNameReducer = customerNameSlice.reducer;
