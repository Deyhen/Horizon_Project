import axios from "axios";

const instance  = axios.create({
    withCredentials: true,
    baseURL: process.env.NEXT_PUBLIC_BACKEND_URL
})

instance.interceptors.request.use(config => {
    config.headers.Authorization = `Bearer ${localStorage.getItem('accessToken')}`;
    return config
})

export default instance