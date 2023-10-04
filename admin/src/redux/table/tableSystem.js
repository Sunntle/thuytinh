import { createSlice } from "@reduxjs/toolkit";
// const initialState = {
//     tables: []
// }
const tableSystem = createSlice({
    name: "table",
    initialState: null,
    reducers:{
        AddTable:(state,action) => {
            state = action.payload
            return state
            // state.tables.push(action.payload);
        },
        RemoveTable:(state) =>{
            state = [];
            return state;
        },
    }
})
export const {AddTable, RemoveTable} = tableSystem.actions;
export default tableSystem.reducer;