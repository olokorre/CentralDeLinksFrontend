import axios from "axios";
import configuration from "./configuration";

const http = axios.create({
    baseURL: configuration.baseUrl,
    headers: {
        'access-token': localStorage.getItem('accessToken')
    }
});

export default http;
