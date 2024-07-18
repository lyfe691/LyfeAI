import axios from 'axios';

const api = axios.create({
    baseURL: 'http://localhost:8080',
    headers: {
        'Content-Type': 'application/json',
    },
});

export const register = async (userData) => {
    return api.post('/auth/register', userData);
};

export const login = async (userData) => {
    return api.post('/auth/login', userData);
};

export const chat = async (message) => {
    return api.post('/chat', { message });
};

export default api;
