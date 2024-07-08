import axios from "axios";

const axiosBase = axios.create({
    baseURL: "https://api.escuelajs.co/api/v1",
    headers: { "Content-Type": "application/json" },
});

export default axiosBase;

