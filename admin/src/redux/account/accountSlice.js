import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { callFetchAccount } from '../../services/api';
import { socket } from '../../socket';

const initialState = {
    isAuthenticated: false,
    isLoading: false,
    user: {
        email: '',
        phone: '',
        name: '',
        role: '',
        avatar: '',
        address: '',
        id: '',
    }
};
export const fetchAccount = createAsyncThunk('account/fetchAccount', async (_, { rejectWithValue }) => {
    const response = await callFetchAccount();
    if (response.success == false) {
        return rejectWithValue(response);
    }
    return response
})
export const accountSlide = createSlice({
    name: 'account',
    initialState,
    reducers: {
        doLoginAction: (state, action) => {
            state.isAuthenticated = true;
            state.user = action.payload;
            socket.connect()
            socket.emit("user-connected",  action.payload)
        },
        getAccountAction: (state, action) => {
            state.isAuthenticated = true;
            state.user = action.payload;
        },
        doLogoutAction: () => {
            socket.disconnect()
            localStorage.removeItem('access_token');
            return initialState
        }
    },
    extraReducers: builder => {
        builder
            .addCase(fetchAccount.pending, (state) => {
                state.isAuthenticated = false;
                state.isLoading = true;
            })
            .addCase(fetchAccount.rejected, (state) => {
                state.isAuthenticated = false;
                state.isLoading = false;
                localStorage.removeItem('access_token');
            })
            .addCase(fetchAccount.fulfilled, (state, action) => {
                state.isAuthenticated = true;
                state.user = action.payload;
                state.isLoading = false;
            })
    }
});

export const { doLoginAction, getAccountAction, doLogoutAction } =
    accountSlide.actions;

export default accountSlide.reducer;