import axios from "axios";
import configuration from "./configuration";

const http = axios.create({
    baseURL: configuration.baseUrl
});

export default http;
