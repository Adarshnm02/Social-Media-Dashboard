import axios from "axios";
import { store } from "../app/store";


const apiClient = axios.create({
    baseURL: `http://localhost:3001`
});


apiClient.interceptors.request.use((config) => {
    const token = store.getState().auth.token || localStorage.getItem('token');
    if(token) config.headers.Authorization = `Bearer ${token}`;
    return config;
})


export default apiClient;