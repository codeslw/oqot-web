import {useQuery, UseQueryOptions} from "@tanstack/react-query";
import api from "@/api/api";
import {Axios, AxiosResponse} from "axios";


export  const  useQueryApi = <TData=any, TError = any, TSelect = TData, TKey = any>(
    url : string,
    params : any,
    options : Omit<UseQueryOptions<AxiosResponse<TData>, TError, TSelect, any>, "queryFn" | "queryKey">
) => {
    return useQuery<AxiosResponse<TData>, TError, TSelect, any>([url, {...params}],  () => api.get<TData>(url, {params}), options)
}