import axios from "axios";
import { store } from "../app/store";

const apiClient = axios.create({
    baseURL: import.meta.env.VITE_API_URL || 'http://localhost:3001', // Fallback to localhost if the variable is not set
});

apiClient.interceptors.request.use((config) => {
    const token = store.getState().auth.token || localStorage.getItem('token');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
})


export default apiClient;