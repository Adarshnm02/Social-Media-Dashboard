import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { AuthState, LoginCredentials, User } from "../../types/types";
import axios from "axios";




const initialState: AuthState = {
    user: null,
    token: localStorage.getItem('token'),
    status: 'idle',
    error: null,
};


export const login = createAsyncThunk(
    'auth/login',
    async (credentials: LoginCredentials) => {
        const response = await axios.post('/api/auth/login', credentials);
        return response.data;
    }
);

export const register = createAsyncThunk(
    'auth/register',
    async (userData: User) => {
        const response = await axios.post('/api/auth/register', userData);
        return response.data;
    }
);


const authSlice = createSlice({
    name:'auth',
    initialState,
    reducers: {
        logout: (state) => {
            state.user = null;
            state.token = null;
            localStorage.removeItem('token');
        },
    },

    extraReducers: (builder) => {
        builder
            .addCase(login.fulfilled, (state,action) => {
                state.user = action.payload.user;
                state.token = action.payload.token;
                localStorage.setItem('token', action.payload.token);
            })
            .addCase(register.fulfilled, (state, action) => {
                state.user = action.payload.user;
                state.token = action.payload.token;
                localStorage.setItem('token', action.payload.token)
            });
    },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;