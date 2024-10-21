import axiosStatic from 'axios';
import { NEWS_API_KEY } from './config.js';

const axios = axiosStatic.create({
    baseURL: 'https://newsapi.org/v2',
    headers: {
        Authorization: `Bearer ${NEWS_API_KEY}`
    }
});

export default axios;