import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';
import { CommonResponse } from './common';

const ACCESS_TOKEN = import.meta.env.VITE_GITHUB_ACCESS_TOKEN;

export const api: AxiosInstance = axios.create({
    baseURL: 'https://github.com', 
    timeout: 5000,                    
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/vnd.github.v3+json'
    }
});

api.interceptors.request.use(
    (config) => {
        if(ACCESS_TOKEN) {
            config.headers['Authorization'] = `Bearer ${ACCESS_TOKEN}`;
        }
        return config;
    },
    (error) =>{
        return Promise.reject(error);
    }
)

export async function apiRequest<T>(config: AxiosRequestConfig): Promise<CommonResponse<T>> {
    try {
        const response: AxiosResponse<T> = await api.request<T>(config);
        return {
            successOrNot: true,
            data: response.data,
            message: "Request successful"
        };
    } catch (error: any) {
        console.error("API Request Error:", error);

        return {
            successOrNot: false,
            data: null as unknown as T,
            message: error.response?.data?.message || error.message || "Request failed"
        };
    }
}

export const apiGet = async <T>(url: string, params?: any): Promise<CommonResponse<T>> => {
    return apiRequest<T>({
        method: 'GET',
        url,
        params
    });
};

export const apiPost = async <T>(url: string, data?: any): Promise<CommonResponse<T>> => {
    return apiRequest<T>({
        method: 'POST',
        url,
        data
    });
}
