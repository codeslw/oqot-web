import {AxiosRequestConfig, AxiosResponse, Method} from "axios";
import {useMutation, UseMutationOptions} from "@tanstack/react-query";
import api from "@/api/api";



export interface IAdvancedPayloadWrapper<T> {
    payload?: T;
    slug?: string;
}

export const useMutationApi = <TData,TPayloadData>(
    url : string,
    method : "get" | "post" | "put" | "patch" | "delete",
    options: Omit<UseMutationOptions<AxiosResponse<TData>, unknown, TPayloadData, unknown>, "queryFn" | "queryKey">,
    config? : AxiosRequestConfig,
) => {
    return useMutation([url], (data : TPayloadData) => api?.[method](url,
        Array.isArray(data) ? data : {...data},
        config), options)
}

export const useMutationApiAdvanced = <TData,TPayloadData=any>(
    url : string,
    method : "get" | "post" | "put" | "patch" | "delete",
    options: Omit<UseMutationOptions<AxiosResponse<TData>, unknown, IAdvancedPayloadWrapper<TPayloadData>, unknown>, "queryFn" | "queryKey">,
    config? : AxiosRequestConfig,
) => {
    return useMutation([url], (data: IAdvancedPayloadWrapper<TPayloadData>) => api?.[method]((url + (data.slug ?? "")), data.payload, config), options)
}

