import axios from "axios";
import configuration from "./configuration";

const http = axios.create({
    baseURL: configuration.baseUrl
});

http.interceptors.request.use(
    config => {
        config.headers['access-token'] = localStorage.getItem('accessToken');
        return config;
    },
    error => Promise.reject(error)
)

export default http;
