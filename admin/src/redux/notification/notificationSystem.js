import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { deleteOne, getAllNotification, readAll, readOne } from "../../services/api";
const initialState = {
    content: [],
    isLoading: false,
    lastNotification: null
}
export const fetchNotification = createAsyncThunk('notification/fetchNotification', async () => {
    const response = await getAllNotification({ _sort: "createdAt", _order: "DESC", _limit: 10 });
    let lastNotification = null
    if (response.some(el => el.status == 0)) lastNotification = response[0]
    return { data: response, lastNotification }
})

// export const loadMoreData = createAsyncThunk('notification/loadMoreData', async (step, thunkApi) => {
//     const {content: listNoti, isLoading} = thunkApi.getState().notifications
//     if(isLoading) return
//     const response = await getAllNotification({ _sort: "createdAt", _order: "DESC", _limit: 10, _offset: step });
//     let lastNotification = null
//     if (response.some(el => el.status == 0)) lastNotification = response[0]
//     return { data: [...listNoti, ...response], lastNotification }
// })

export const maskAllRead = createAsyncThunk('notification/maskAllRead', async (_, thunkApi) => {
    const listNoti = thunkApi.getState().notifications.content
    if (listNoti.some((el) => el.status == 0 || el.status === false)) {
        const arr = listNoti.map((el) => ({ ...el, status: 1 }))
        await readAll({ listId: arr });
        return arr
    } else {
        return listNoti
    }
})
export const maskAsRead = createAsyncThunk('notification/maskAsRead', async (notification, thunkApi) => {
    const listNoti = thunkApi.getState().notifications.content
    if (notification.status === 0 || notification.status === false) {
        const updatedNotifications = listNoti.map((item) => {
            if (item.id === notification.id) {
                return { ...item, status: 1 };
            }
            return item;
        });
        await readOne({ listId: [notification] });
        return updatedNotifications;
    } else {
        return listNoti
    }

})
export const deleteNotification = createAsyncThunk('account/deleteNotification', async (notificationId, thunkApi) => {
    const listNoti = thunkApi.getState().notifications.content
    if (listNoti.length < 1) {
        return listNoti
    }
    const newArr = listNoti.filter(el => el.id !== notificationId)
    await deleteOne(notificationId)
    return newArr
})
const notificationSystem = createSlice({
    name: "notification",
    initialState,
    reducers: {
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
                state.content = action.payload.data;
                state.lastNotification = action.payload.lastNotification
                state.isLoading = false
            })
            // .addCase(loadMoreData.pending, (state) => {
            //     state.isLoading = true;
            // })
            // .addCase(loadMoreData.fulfilled, (state, action) => {
            //     state.content = action.payload.data;
            //     state.lastNotification = action.payload.lastNotification
            //     state.isLoading = false
            // })
            .addCase(maskAllRead.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(maskAsRead.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(deleteNotification.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(maskAllRead.fulfilled, (state, action) => {
                state.content = action.payload
                state.lastNotification = null
                state.isLoading = false;
            })
            .addCase(maskAsRead.fulfilled, (state, action) => {
                state.content = action.payload
                state.isLoading = false;
            })
            .addCase(deleteNotification.fulfilled, (state, action) => {
                state.content = action.payload
                state.isLoading = false;
            })
    }
})

export const { addNewMessage } = notificationSystem.actions;
export default notificationSystem.reducer;