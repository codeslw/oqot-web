"use client"

import {useEffect, useState} from "react";
import {useQueryApi} from "@/hooks/useQueryApi";
import {GET_GOOD_SEARCH} from "@/utils/constants";
import {CircularProgress, Stack} from "@mui/material";
import {IGood} from "@/types/Goods";
import {usePathname} from "@/navigation";
import {useQueryParams} from "@/hooks/useQueryParams";
import {useRouter} from "next/navigation";

interface IProductSearchPopoverContent {
    searchText : string;
    width : number;
    onClose : () => void;
}

export const ProductSearchPopoverContent : React.FC<IProductSearchPopoverContent> = ({searchText, width, onClose}) => {

    const [debounce, setDebounce] = useState("");
    const pathname = usePathname();
    const {createQueryString} = useQueryParams();
    const router = useRouter()

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



    return <div
        className={`rounded-2xl bg-white absolute z-50 top-16 -left-4 shadow-lg !max-h-[25rem] overflow-y-auto overflow-x-hidden px-3 no-scrollbar`}>
        {goods.isLoading ? <div style={{width : `${width + 48}px`}} className={'w-full h-12 flex-center'}>
            <CircularProgress className={"text-orange-default"}/>
        </div> : goods.data?.data?.data?.map((item: IGood) => {
            return <div
                onClick={() => {
                    setDebounce("")
                    router.push(`${pathname}?${createQueryString('goodId', item.id)}`)
                    onClose();
                }
                 }
                style={{width : `${width + 48}px`}}
                className="w-full p-3 text-base-light rounded-2xl hover:bg-gray-background cursor-pointer">
                {item.nameRu}
            </div>
        })}
    </div>
}