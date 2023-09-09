import { combineReducers } from '@reduxjs/toolkit';
import {orderReducer} from "./Order/orderSlice.js";
import {customerNameReducer} from "./CustomerName/customerNameSlice.js";

const rootReducer = combineReducers({
    order: orderReducer,
    customerName: customerNameReducer
});

export default rootReducer;
