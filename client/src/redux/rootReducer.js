import { combineReducers } from "@reduxjs/toolkit";
import { orderReducer } from "./Order/orderSlice.js";
import { customerNameReducer } from "./CustomerName/customerNameSlice.js";
import { selectedItemsReducer } from "./SelectedItem/selectedItemsSlice.js";
import { ratingReducer } from "./Rating/ratingSlice.js";

const rootReducer = combineReducers({
  order: orderReducer,
  customerName: customerNameReducer,
  selectedItem: selectedItemsReducer,
  rating:ratingReducer,
});

export default rootReducer;
