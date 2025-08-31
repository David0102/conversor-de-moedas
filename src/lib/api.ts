import axios from 'axios';

const API_BASE_URL = 'https://api.exchangerate.host/';
const ACCESS_KEY = import.meta.env.VITE_ACCESS_KEY_EXCHANGE_RATE;

if (!ACCESS_KEY) {
    throw new Error('VITE_ACCESS_KEY_EXCHANGE_RATE environment variable is required');
}

const api = axios.create({
    baseURL: API_BASE_URL,
    params: {
        access_key: ACCESS_KEY,
    },
});

export default api;
