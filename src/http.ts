import axios from "axios";
import configuration from "./configuration";
import router from "@/router";
import { useAuthStore } from "@/stores/auth";

const http = axios.create({
    baseURL: configuration.baseUrl
});

http.interceptors.request.use(
    config => {
        config.headers['access-token'] = useAuthStore().token ?? localStorage.getItem('accessToken');
        return config;
    },
    error => Promise.reject(error)
)

http.interceptors.response.use(
    response => response,
    error => {
        if (error.response?.status === 401) {
            useAuthStore().clearToken();
            router.push('/login');
        }
        return Promise.reject(error);
    }
)

export default http;
