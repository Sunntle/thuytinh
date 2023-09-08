import { combineReducers } from '@reduxjs/toolkit';
import {orderReducer} from "./Order/orderSlice.js";

const rootReducer = combineReducers({
    order: orderReducer
});

export default rootReducer;
