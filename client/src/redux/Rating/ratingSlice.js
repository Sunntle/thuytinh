import {createSlice} from "@reduxjs/toolkit";

const ratingSlice = createSlice({
    name: 'rating',
    initialState: {
      id_order:0,
    },
    reducers: {
      getIdOrder: (state, action) => {
         state.id_order = action.payload;
         return state;
      }
    }
})

export const {getIdOrder} = ratingSlice.actions
export const ratingReducer = ratingSlice.reducer