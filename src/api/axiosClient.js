import axios from "axios";

const axiosClient = axios.create({
    baseURL: "http://localhost:5000/api",
    withCredentials: true // this ensures cookies are sent
});

export default axiosClient;
