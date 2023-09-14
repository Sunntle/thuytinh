import { combineReducers } from '@reduxjs/toolkit';
import {orderReducer} from "./Order/orderSlice.js";
import {customerNameReducer} from "./CustomerName/customerNameSlice.js";
import {selectedItemsReducer} from "./SelectedItem/selectedItemsSlice.js";

const rootReducer = combineReducers({
    order: orderReducer,
    customerName: customerNameReducer,
    selectedItem: selectedItemsReducer
});

export default rootReducer;
