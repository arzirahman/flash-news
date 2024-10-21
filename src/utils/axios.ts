import axiosStatic from 'axios';

const axios = axiosStatic.create({
    baseURL: import.meta.env.VITE_API_URL,
});

export default axios;