import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { Post, Comment } from "../../types/types";
import axios from "axios";
import { store } from "../../app/store";
import socket from "../../services/socket";
import apiClient from "../../services/apiClient";


interface PostsState {
    posts: Post[];
    status: 'idle' | 'loading' | 'succeeded' | 'failed';
    page: number;
    hasMore: boolean;
}
const dummyPost: Post = {
    id: '1',
    user: {
        id: '1',
        email: 'john@example.com',
        password: 'password',
        avatar: 'https://i.pravatar.cc/150?img=1',
        username: 'john_doe',
    },
    content: 'This is a dummy post',
    author: {
        id: '1',
        email: 'john@example.com',
        password: 'password',
        avatar: 'https://i.pravatar.cc/150?img=1',
        username: 'john_doe',
    },
    likes: 0,
    comments: [],
    createdAt: '2024-01-01',
    updatedAt: '2024-01-01',
};


const initialState: PostsState = {
    posts: [dummyPost],
    status: 'idle',
    page: 1,
    hasMore: true,
};


export const fetchPosts = createAsyncThunk('posts/fetchPosts', async (page: number) => {
    const response = await apiClient.get(`/posts?_page=${page}&_limit=5`);
    return {
        posts: response.data,
        hasMore: response.headers['x-total-count'] > page * 5,
      };
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
                state.posts = [...state.posts, ...action.payload.posts];
                state.hasMore = action.payload.hasMore;
                state.page += 1;
              });

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