import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getAllNotification, readAll, readOne } from "../../services/api";
const initialState = {
    content: [],
    isLoading: false,
    lastNotification: null
}
export const fetchNotification = createAsyncThunk('account/fetchNotification', async () => {
    const response = await getAllNotification({_sort: "createdAt", _order: "DESC", _limit: 5});
    return response
})
export const maskAllRead = createAsyncThunk('account/maskAllRead', async (_, thunkApi) => {
    const listNoti = thunkApi.getState().notifications.content
    if(listNoti.some((el) => el.status == 0)){
        const arr = listNoti.map((el) => ({ ...el, status: 1 }))
        await readAll({listId: arr});
        return arr
    }
})
export const maskAsRead = createAsyncThunk('account/maskAsRead', async (notification, thunkApi) => {
    const listNoti = thunkApi.getState().notifications.content
    console.log(listNoti);
    if (notification.status === 0){
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
})
const notificationSystem = createSlice({
    name: "notification",
    initialState,
    reducers:{
        addNewMessage: (state, action) => {
            const arr = [action.payload, ...state.content];
            arr.length > 5 && arr.pop();
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
                state.content = action.payload;
                state.lastNotification=null
                state.isLoading = false
            })
            .addCase(maskAllRead.fulfilled, (state, action)=>{
                state.content = action.payload
                state.lastNotification=null
            })
            .addCase(maskAsRead.fulfilled, (state, action)=>{
                state.content = action.payload
            })
    }
})

export const {addNewMessage} = notificationSystem.actions;
export default notificationSystem.reducer;