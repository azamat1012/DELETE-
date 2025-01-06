import axios from 'axios'
import { ACCESS_TOKEN } from '../constents'

const api = axios.create({
    // baseURL: import.meta.env.VITE_API_URL ----- Лучше все хранить в .env файле для безопасности
    baseURL: 'http://127.0.0.1:8000'
})

api.interceptors.request.use(
    (config) =>{
        const token = localStorage.getItem(ACCESS_TOKEN);
        if(token){
            config.headers.Authorization = `Bearer ${token}`
            console.log("Token:", token);
        }
        return config
    },
    (error)=>{
        return Promise.reject(error)

    }
)

export default api