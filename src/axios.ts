import axios from "axios";
import { isTokenExpired } from "./auth/AuthUtil";


const BASE_URL = import.meta.env.VITE_API_BASE_URL;
const axiosInstance = axios.create({
    baseURL: BASE_URL,
    headers: {
        'Content-Type': 'application/json'
    }
})

axiosInstance.interceptors.request.use((config) => {
    const token = localStorage.getItem('accessToken');
    if (token && !isTokenExpired(token)) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
},
    (error) => {
        return Promise.reject(error);
    }
)

axiosInstance.interceptors.response.use((res) => res, error => {
    if (error.response?.status === 401) {
        localStorage.removeItem("accessToken");

    }
    return Promise.reject(error);
})

export default axiosInstance;