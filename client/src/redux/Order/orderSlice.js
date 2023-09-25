import {createSlice} from "@reduxjs/toolkit";

const orderSlice = createSlice({
    name: 'order',
    initialState: [],
    reducers: {
        addToOrder: (state, action) => {
            const food = action.payload
            const existingItem = state.find(item => item.id === food.id)
            if (existingItem) {
                existingItem.quantity += 1
            } else {
                state.push({...food, quantity: 1})
            }
        },
        removeFromOrder: (state, action) => {
            const id = action.payload
            state = state.filter(item => item.id !== id)
            return state
        },
        increaseQuantity: (state, action) => {
            const food = action.payload
            const existingItem = state.find(item => item.id === food.id)
            if (existingItem) {
                existingItem.quantity += 1
            }
        },
        decreaseQuantity: (state, action) => {
            const food = action.payload
            const existingItem = state.find(item => item.id === food.id)
            if (existingItem) {
                existingItem.quantity -= 1
            }
        },
        emptyOrder: (state) => {
            state = [];
            return state
        }
    }
})

export const {emptyOrder, addToOrder,removeFromOrder, increaseQuantity, decreaseQuantity} = orderSlice.actions
export const orderReducer = orderSlice.reducer