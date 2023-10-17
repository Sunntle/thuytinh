import { createSlice } from "@reduxjs/toolkit";

const selectedItemsSlice = createSlice({
  name: "selectedItem",
  initialState: {
    products: [],
    total: 0,
  },
  reducers: {
    addSelectedItems: (state, action) => {
      state = action.payload;
      return state;
    },
    emptySeletedItems: (state) => {
      state.products = [];
      return state;
    },
  },
});


export const { emptySeletedItems, addSelectedItems } =
  selectedItemsSlice.actions;
export const selectedItemsReducer = selectedItemsSlice.reducer;
