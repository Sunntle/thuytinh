import {createSlice} from "@reduxjs/toolkit";
const initialState = {
    order: [],
    idOrder: 0
}
const orderSlice = createSlice({
    name: 'order',
    initialState: initialState,
    reducers: {
        addToOrder: (state, action) => {
            const food = action.payload
            const existingItem = state.order.find(item => item.id === food.id)
            if (existingItem) {
                existingItem.quantity += 1
            } else {
                state.order.push({...food, quantity: 1})
            }
        },
        addIdOrder: (state, action) => {
            state.idOrder = action.payload
        },
        removeFromOrder: (state, action) => {
            const id = action.payload
            state.order.filter(item => item.id !== id)
        },
        increaseQuantity: (state, action) => {
            const food = action.payload
            const existingItem = state.order.find(item => item.id === food.id)
            if (existingItem) {
                existingItem.quantity += 1
            }
        },
        decreaseQuantity: (state, action) => {
            const food = action.payload
            const existingItem = state.order.find(item => item.id === food.id)
            if (existingItem) {
                existingItem.quantity -= 1
            }
        },
        emptyOrder: (state) => {
            state.order = [];
        }
    }
})

export const {emptyOrder,addIdOrder, addToOrder,removeFromOrder, increaseQuantity, decreaseQuantity} = orderSlice.actions
export const orderReducer = orderSlice.reducer