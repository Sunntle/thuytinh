import { createSlice } from "@reduxjs/toolkit";
const initialState = {
    darkMode: false,
    lang: "vi"
} 
const customizeSystem = createSlice({
    name: "customize",
    initialState,
    reducers:{
        ChangeMode:(state,action) => {
            const {darkMode} = action.payload
            document.body.style.backgroundColor = darkMode ?  "#001529": "white"
            state.darkMode = darkMode
        },
        ChangeLang:(state,action) => {
            const {lang} = action.payload
            state.lang = lang
        },
    }
})

export const {ChangeMode, ChangeLang} = customizeSystem.actions;
export default customizeSystem.reducer;