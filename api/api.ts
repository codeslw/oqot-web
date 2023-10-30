import axios, { AxiosInstance, AxiosRequestConfig } from 'axios';
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
        const unsubscribe = window.addEventListener("authenticationRequired", () => {})
    }
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

