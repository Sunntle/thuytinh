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
        RemoveTableList:(state) =>{
            state = null;
            return state;
        },
    }
})
export const {AddTableList, RemoveTableList} = listTableSystem.actions;
export default listTableSystem.reducer;