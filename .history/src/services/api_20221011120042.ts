import axios from 'axios';
import { parseCookies } from 'nookies';

const { 'nextauth.token' : token } = parseCookies()

export const api = axios.create({
    baseURL : 'postgresql://sites:sites@localhost:5432/documentos?schema=documentos'
})

api.interceptors.request.use(config => {
    console.log(config);

    return config;
})

if (token) {
    api.defaults.headers['Authorization'] = `Bearer ${token}`;
}