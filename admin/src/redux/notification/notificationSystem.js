import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { deleteOne, getAllNotification, readAll, readOne } from "../../services/api";
const initialState = {
    content: [],
    isLoading: false,
    lastNotification: null
}
export const fetchNotification = createAsyncThunk('account/fetchNotification', async () => {
    const response = await getAllNotification({_sort: "createdAt", _order: "DESC", _limit: 10});
    let lastNotification = null
    if(response.some(el=> el.status == 0)) lastNotification = response[0]
    return {data: response, lastNotification}
})
export const maskAllRead = createAsyncThunk('account/maskAllRead', async (_, thunkApi) => {
    const listNoti = thunkApi.getState().notifications.content
    if(listNoti.some((el) => el.status == 0 || el.status === false)){
        const arr = listNoti.map((el) => ({ ...el, status: 1 }))
        await readAll({listId: arr});
        return arr
    }else{
        return listNoti
    }
})
export const maskAsRead = createAsyncThunk('account/maskAsRead', async (notification, thunkApi) => {
    const listNoti = thunkApi.getState().notifications.content
<<<<<<< HEAD
    console.log(listNoti);
    if (notification.status === 0){
=======
    if (notification.status === 0 || notification.status === false){
>>>>>>> 571f44a2286a29a98c9de53b72d596c14502ce9b
        const updatedNotifications = listNoti.map((item) => {
            if (item.id === notification.id) {
              return { ...item, status: 1 };
            }
            return item;
          });
          await readOne({ listId: [notification] }); 
          return updatedNotifications;
    }else{
        return listNoti
    }
<<<<<<< HEAD
=======

})
export const deleteNotification = createAsyncThunk('account/deleteNotification', async (notificationId, thunkApi) => {  
    const listNoti = thunkApi.getState().notifications.content
    if(listNoti.length < 1){
       return listNoti
    }
    const newArr = listNoti.filter(el => el.id !== notificationId)
    await deleteOne(notificationId)
    return newArr
>>>>>>> 571f44a2286a29a98c9de53b72d596c14502ce9b
})
const notificationSystem = createSlice({
    name: "notification",
    initialState,
    reducers:{
        addNewMessage: (state, action) => {
            const arr = [action.payload, ...state.content];
            arr.length > 10 && arr.pop();
            state.content = arr;
            state.lastNotification = arr[0];
        },
    },
    extraReducers: builder => {
        builder
            .addCase(fetchNotification.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(fetchNotification.rejected, (state) => {
                state.isLoading = false;
            })
            .addCase(fetchNotification.fulfilled, (state, action) => {
<<<<<<< HEAD
                state.content = action.payload;
                state.lastNotification=null
=======
                state.content = action.payload.data;
                state.lastNotification=action.payload.lastNotification
>>>>>>> 571f44a2286a29a98c9de53b72d596c14502ce9b
                state.isLoading = false
            })
            .addCase(maskAllRead.fulfilled, (state, action)=>{
                state.content = action.payload
                state.lastNotification=null
            })
            .addCase(maskAsRead.fulfilled, (state, action)=>{
                state.content = action.payload
            })
            .addCase(deleteNotification.fulfilled, (state, action)=>{
                state.content = action.payload
            })
    }
})

export const {addNewMessage} = notificationSystem.actions;
export default notificationSystem.reducer;