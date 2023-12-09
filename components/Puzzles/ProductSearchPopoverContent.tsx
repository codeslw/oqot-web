"use client"

import {useEffect, useState} from "react";
import {useQueryApi} from "@/hooks/useQueryApi";
import {GET_GOOD_SEARCH} from "@/utils/constants";
import {CircularProgress, Stack} from "@mui/material";
import {IGood} from "@/types/Goods";

interface IProductSearchPopoverContent {
    searchText : string;
}

export const ProductSearchPopoverContent : React.FC<IProductSearchPopoverContent> = ({searchText}) => {

    const [debounce, setDebounce] = useState("");

    const goods = useQueryApi(GET_GOOD_SEARCH, {
        searchQuery : debounce
    }, {
        enabled : !!debounce
    })

    useEffect(() => {
        const interval = setTimeout(() => {
            setDebounce(searchText)
        }, 700);

        return () => {
            clearTimeout(interval)
        }
    }, [searchText]);



    return <Stack spacing={0}>
        {goods.isLoading ? <div className={'w-full h-12 flex-center'}>
            <CircularProgress className={"text-orange-default"}/>
        </div> : goods.data?.data?.data?.map((item : IGood) => {
            return <div className="w-full p-3 text-base-light rounded-2xl hover:bg-gray-background">
                {item.nameRu}
            </div>
        })}
    </Stack>
}