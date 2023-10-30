"use client"
import {useQueryApi} from "@/hooks/useQueryApi";
import {GOOD_TO_CART_URL, REPLACE_CART_URL} from "@/utils/constants";
import {ICart, IStateCart} from "@/types/common";
import cartStore from "@/utils/stores/CartStore";
import {useEffect, useState} from "react";
import {useMutationApi} from "@/hooks/useMutationApi";
import {usePathname, useRouter} from "next/navigation";
import _ from "lodash";


export const useSynchronizeCart = () => {
    const pathname = usePathname();
    const router = useRouter();
    //const [enableGetCartItems, setFirstLoad] = useState(true);
    let history: string | null = "";
    const locales = ["en", "ru", "uz"];
    const getCartItems = useQueryApi(GOOD_TO_CART_URL,{}, {
        refetchOnWindowFocus : false,
        refetchOnMount : false,
        refetchInterval : 10000000000,
        cacheTime : 10000000000,
        staleTime : 1000000000,
        onSuccess : (data) => {
            enabled : JSON.parse(history!)?.length === "0" || !history;
            const formattedCartItems = data?.data?.goodToCarts?.map((item : ICart) => ({...item, clientId : undefined, id : undefined}));
            cartStore.setCart(formattedCartItems);
        }
    });
    const replaceCartItems = useMutationApi<unknown,IStateCart[]>(REPLACE_CART_URL, "put", {})


    const updateCart = async () => {
        console.log("updateCart triggered")
        try {
            const payload = cartStore.cart.map((item) => ({id : item.goodId, count : item.count}));
            const response = await replaceCartItems.mutateAsync(payload);
            if (response.status < 400) {
                getCartItems.refetch();
            }
        }
        catch (e) {

        }
    }

    useEffect(() => {
        history = sessionStorage?.getItem("nav_history");
        const updated : string[] = Array.isArray(history) ? [...history, pathname] : [pathname as string];
        const previous = Array.isArray(history) ? [...history] : [];
        sessionStorage?.setItem("nav_history_prev", JSON.stringify(previous));
        sessionStorage?.setItem("nav_history", JSON.stringify(updated));
        const difference = _.difference(updated, previous);
        if(!locales.some((locale) => difference.includes(`/${locale}`))) {
            console.log(window.location.pathname, replaceCartItems.isLoading, " location")
            updateCart()
        }
    },[])


    return {
        cartItems : getCartItems,
        loading : getCartItems.isLoading
    };
};