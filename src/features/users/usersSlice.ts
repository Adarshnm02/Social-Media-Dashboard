import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import apiClient from "../../services/apiClient";
import { User } from "../../types/types";



interface UserState {
    currentUser: User | null;
    status: 'idle' | 'loading' | 'succeeded' | 'failed';
}

const initialState: UserState = {
    currentUser: null,
    status: 'idle'
}


export const fetchUser = createAsyncThunk('users/fetchUser', async(userId: string) => {
    const response = await apiClient.get(`/users/${userId}`);
    return response.data;
});

export const updateUser = createAsyncThunk('users/updateUser', async (userData: Partial<User>) => {
    const response = await apiClient.patch(`/users/${userData.id}`, userData);
    return response.data;
})

const usersSlice = createSlice({
    name: 'users',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchUser.fulfilled, (state, action) => {
                state.currentUser = action.payload;
            })
            .addCase(updateUser.fulfilled, (state, action) => {
                state.currentUser = action.payload;
            })
    }
});


export default usersSlice.reducer;