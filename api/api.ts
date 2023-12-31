import axios, { AxiosInstance, AxiosRequestConfig } from 'axios';
import UIStore from "@/utils/stores/UIStore";
import AuthStore from "@/utils/stores/AuthStore";

// Default config for the axios instance
const axiosParams = {
    baseURL: process.env.NEXT_PUBLIC_URL,
};


const axiosInstance = axios.create(axiosParams);
// Main api function



axiosInstance.interceptors.request.use((config) => {

    const token = localStorage.getItem("accessToken")
    config.headers["authorization"] = `Bearer ${token}`

    return config;
},
    (error) => {
    if(error.response?.status === 401){

        UIStore.setIsTokenWrong(true)
    }

    return Promise.reject(error)
})

axiosInstance.interceptors.response.use((config) => config, (error) => {
    console.log("Here is error", error)
    if (error.response.status === 401) {
        console.log("unauthorized")
        AuthStore.setIsUserAuthenticated(false)
        UIStore.setIsTokenWrong(true)
    }

    return Promise.reject(error)
})

const api : any = (axios: AxiosInstance) => {
    return {
        get: <T>(url: string, config: AxiosRequestConfig = {}) =>
            axios.get<T>(url, config),
        delete: <T>(url: string, config: AxiosRequestConfig = {}) =>
            axios.delete<T>(url, config),
        post: <T>(url: string, body: unknown, config: AxiosRequestConfig = {}) =>
            axios.post<T>(url, body, config),
        patch: <T>(url: string, body: unknown, config: AxiosRequestConfig = {}) =>
            axios.patch<T>(url, body, config),
        put: <T>(url: string, body: unknown, config: AxiosRequestConfig = {}) =>
            axios.put<T>(url, body, config),
    };
};
export default api(axiosInstance);

