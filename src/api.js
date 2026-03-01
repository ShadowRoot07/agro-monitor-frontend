import axios from 'axios';

const api = axios.create({
    baseURL: 'https://core-clima-backend.onrender.com/api'
});

export default api;

