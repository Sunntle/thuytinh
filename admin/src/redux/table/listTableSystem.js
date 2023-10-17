import { createSlice } from "@reduxjs/toolkit";

const listTableSystem = createSlice({
    name: "listtable",
    initialState: null,
    reducers:{
        AddTableList:(state,action) => {
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
export const {AddTableList, RemoveTable} = listTableSystem.actions;
export default listTableSystem.reducer;