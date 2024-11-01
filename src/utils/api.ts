import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';
import { CommonResponse } from './common';

export const api: AxiosInstance = axios.create({
    baseURL: 'https://api.github.com', // Set your API base URL here
    timeout: 5000,                     // Set a timeout for requests
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
    }
});

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
