import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { callFetchAccount } from '../../services/api';

const initialState = {
    isAuthenticated: false,
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
export const fetchAccount = createAsyncThunk('account/fetchAccount', async () => {
    const response = await callFetchAccount();
    console.log(response)
    return response
})
export const accountSlide = createSlice({
    name: 'account',
    initialState,
    reducers: {
        doLoginAction: (state, action) => {
            state.isAuthenticated = true;
            state.user = action.payload;
        },
        getAccountAction: (state, action) => {
            state.isAuthenticated = true;
            state.user = action.payload;
        },
        doLogoutAction: (state) => {
            localStorage.removeItem('access_token');
            state = initialState;
        }
    },
    extraReducers: builder => {
        builder
            .addCase(fetchAccount.pending, (state) => {
                state.isAuthenticated = false;
            })
            .addCase(fetchAccount.rejected, (state) => {
                state.isAuthenticated = false;
            })
            .addCase(fetchAccount.fulfilled, (state, action) => {
                state.isAuthenticated = true;
                state.user = action.payload;
            })
    }
});

export const { doLoginAction, getAccountAction, doLogoutAction } =
    accountSlide.actions;

export default accountSlide.reducer;