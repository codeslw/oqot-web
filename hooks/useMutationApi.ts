import {AxiosRequestConfig, AxiosResponse, Method} from "axios";
import {useMutation, UseMutationOptions} from "@tanstack/react-query";
import api from "@/api/api";


export const useMutationApi = <TData,TPayloadData>(
    url : string,
    method : "get" | "post" | "put" | "patch" | "delete",
    options: Omit<UseMutationOptions<AxiosResponse<TData>, unknown, TPayloadData, unknown>, "queryFn" | "queryKey">,
    config? : AxiosRequestConfig
) => {
    return useMutation([url], (data : TPayloadData) => api?.[method](url, data, config), options)
}