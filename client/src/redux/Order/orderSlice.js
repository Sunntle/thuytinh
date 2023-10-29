import {createSlice} from "@reduxjs/toolkit";
const initialState = {
    order: [],
    idOrder: 0,
    idTable: 0
}
const orderSlice = createSlice({
  name: "order",
  initialState: initialState,
  reducers: {
    addToOrder: (state, action) => {
      const food = action.payload;
      const existingItem = state.order.find((item) => item.id === food.id);
      if (existingItem) {
        existingItem.quantity += 1;
      } else {
        state.order.push({ ...food, quantity: 1 });
      }
    },
    addOrderDetailUpdate: (state, action) => {
      state.order = action.payload;
    },
    addIdOrder: (state, action) => {
      state.idOrder = action.payload;
    },
    addIdOrderTable: (state,action) => {
      const {idTable, idOrder} = action.payload
      state.idOrder = idOrder
      state.idTable = idTable
    },
    removeFromOrder: (state, action) => {
      const id = action.payload;
      const index = state.order.findIndex(item=> item.id === id)
      state.order.splice(index,1)
    },
    increaseQuantity: (state, action) => {
      const food = action.payload;
      const existingItem = state.order.find((item) => item.id === food.id);
      if (existingItem) {
        existingItem.quantity += 1;
      }
    },
    decreaseQuantity: (state, action) => {
      const food = action.payload;
      const existingItem = state.order.find((item) => item.id === food.id);
      if (existingItem.quantity > 1) {
        if (existingItem.inDb && existingItem.inDb === existingItem.quantity) {
          existingItem.quantiy = existingItem.inDb;
        } else {
            existingItem.quantity -= 1;
        }
      }
    },
    emptyOrder: (state) => {
      state.order = [];
    },
  },
});

export const {emptyOrder,addIdOrderTable,addOrderDetailUpdate,addIdOrder, addToOrder,removeFromOrder, increaseQuantity, decreaseQuantity} = orderSlice.actions
export const orderReducer = orderSlice.reducer