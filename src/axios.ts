import axios from "axios";


const BASE_URL = import.meta.env.VITE_API_BASE_URL;
const axiosConfig = axios.create({
    baseURL: BASE_URL,
    headers: {
        'Content-Type': 'application/json'
    }
})

axiosConfig.interceptors.request.use((config) => {
    const token = localStorage.getItem('accessToken');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
},
    (error) => {
        return Promise.reject(error);
    }
)

export default axiosConfig;