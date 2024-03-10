
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { baseURL } from '../baseUrl';
import { userLogin, userLogout } from './loginService';

const getUserfromLocalStorage = localStorage.getItem("user")
    ? JSON.parse(localStorage.getItem("user"))
    : null;

const initialState = {
    user: getUserfromLocalStorage,
    loading: false,
    success: false,
    error: false

}


export const loginUser = createAsyncThunk('auth/login', async (loginUser) => {
    const response = await userLogin(`${baseURL}/user/login`, loginUser);
    if (response.data) {
        localStorage.setItem("user", JSON.stringify(response.data));
    }
    return response.data.LoginUser;

});

export const logoutUser = createAsyncThunk('auth/logout', async () => {
    const response = await userLogout(`${baseURL}/user/logout`);
    return response.data;
});



const userSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(loginUser.pending, (state) => {
                state.loading = true
                state.error = false
                state.success = false
            }).addCase(loginUser.fulfilled, (state, action) => {
                state.loading = false
                state.error = false
                state.success = true
                state.user = action.payload
            }).addCase(loginUser.rejected, (state) => {
                state.loading = false
                state.error = true
                state.success = false
            }).addCase(logoutUser.pending, (state) => {
                state.loading = true
                state.error = false
                state.success = false
            }).addCase(logoutUser.fulfilled, (state, action) => {
                state.loading = false
                state.error = false
                state.success = true
            }).addCase(logoutUser.rejected, (state) => {
                state.loading = false
                state.error = true
                state.success = false
            })

    },
});

export default userSlice.reducer;
