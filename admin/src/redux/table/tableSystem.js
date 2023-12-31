import { createSlice } from "@reduxjs/toolkit";
const tableSystem = createSlice({
    name: "table",
    initialState: null,
    reducers:{
        AddTable:(state,action) => {
            state = action.payload
            return state
        },
        RemoveTable:(state) =>{
            state = [];
            return state;
        },
    }
})
export const {AddTable, RemoveTable} = tableSystem.actions;
export default tableSystem.reducer;