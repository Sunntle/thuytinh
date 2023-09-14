import {createSlice} from "@reduxjs/toolkit";

const selectedItemsSlice = createSlice({
    name: 'selectedItem',
    initialState: null,
    reducers: {
        addSelectedItems: (state, action) => {
            state = action.payload
            return state
        },
        emptySeletedItems: (state) => {
            state = null
            return state
        }
    }
})

export const { addSelectedItems, emptySeletedItems } = selectedItemsSlice.actions
export const selectedItemsReducer = selectedItemsSlice.reducer