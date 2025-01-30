import { configureStore } from "@reduxjs/toolkit";
import { useDispatch } from "react-redux";
import authReducer from '../features/auth/authSlice'
import postsReducer from '../features/posts/postsSlice'



export const store = configureStore({
    reducer: {
        auth: authReducer,
        posts: postsReducer
    }
});

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>();