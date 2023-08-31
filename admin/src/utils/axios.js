
import axios from 'axios';

const instance = axios.create({
    baseURL: 'http://localhost:8000',
    // withCredentials: true
});
instance.interceptors.request.use(function (config) {
    const accessToken = localStorage.getItem('access_token') || '';
    if (accessToken) {
        config.headers['Authorization'] = `Bearer ${accessToken}`;
    }
    return config;
}, function (error) {
    return Promise.reject(error);
});

instance.interceptors.response.use(function (response) {
    return response && response?.data;
}, function (error) {



    return error?.response?.data ?? Promise.reject(error);

});
export default instance;