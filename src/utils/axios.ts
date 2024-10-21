import axiosStatic from 'axios';

const axios = axiosStatic.create({
    baseURL: 'https://newsapi.org/v2',
    headers: {
        Authorization: 'Bearer 563ec25f90aa478a865795c9cab2c77b'
    }
});

export default axios;