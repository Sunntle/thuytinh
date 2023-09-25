import { createSlice } from "@reduxjs/toolkit";
const initialState = {
    tables: []
}
const tableSystem = createSlice({
    name: "table",
    initialState,
    reducers:{
        AddTable:(state,action) => {
            state.tables.push(action.payload);
        },
    }
})
export const {AddTable} = tableSystem.actions;
export default tableSystem.reducer;