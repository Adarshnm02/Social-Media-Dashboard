import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { Post, Comment } from "../../types/types";
import axios from "axios";
import { store } from "../../app/store";
import socket from "../../services/socket";
import apiClient from "../../services/apiClient";


interface PostsState {
    posts: Post[];
    status: 'idle' | 'loading' | 'succeeded' | 'failed';
}

const initialState: PostsState = {
    posts: [],
    status: 'idle',
};


export const fetchPosts = createAsyncThunk('posts/fetchPosts', async () => {
    const response = await axios.get('/api/posts');
    return response.data;
});

export const createPost = createAsyncThunk('posts/createPost', async (content: string) => {
    const response = await axios.post('/api/posts', (content));
    return response.data;
});

export const createComment = createAsyncThunk('posts/createComment', async ({ postId, text }: { postId: string, text: string }) => {
    const response = await apiClient.post(`/posts/${postId}/comments`, { text });
    return response.data;
})

const postsSlice = createSlice({
    name: 'posts',
    initialState,
    reducers: {
        addPost: (state, action) => {
            state.posts.unshift(action.payload);
        },
        addComment: (state, action) => {
            const post = state.posts.find(p => p.id === action.payload.postId);
            if (post) post.comments.push(action.payload.comment)
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchPosts.fulfilled, (state, action) => {
                state.posts = action.payload;
            })

    },
});

// Socket.io listeners

socket.on('newPost', (post: Post) => {
    store.dispatch(postsSlice.actions.addPost(post))
});

socket.on('newComment', ({ postId, comment }: { postId: string; comment: Comment }) => {
    store.dispatch(postsSlice.actions.addComment({ postId, comment }));
})

export const { addPost, addComment } = postsSlice.actions;
export default postsSlice.reducer;