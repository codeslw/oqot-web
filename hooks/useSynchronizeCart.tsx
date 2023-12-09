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
    const [enableGetCartItems, setFirstLoad] = useState(true);

    const getCartItems = useQueryApi(GOOD_TO_CART_URL,{}, {
        refetchOnWindowFocus : false,
        refetchOnMount : true,
        onSuccess : (data) => {
        //    const formattedCartItems = data?.data?.goodToCarts?.map((item : ICart) => ({...item, clientId : undefined, id : undefined}));
          //  cartStore.setCart(formattedCartItems);
        }
    });
    // const replaceCartItems = useMutationApi<unknown,IStateCart[]>(REPLACE_CART_URL, "put", {})
    //
    //
    // const updateCart = async () => {
    //     console.log("updateCart triggered")
    //     try {
    //         const payload = cartStore?.cart?.map((item) => ({id : item.goodId, count : item.count}));
    //         const response = await replaceCartItems.mutateAsync(payload);
    //         if (response.status < 400) {
    //            // getCartItems.refetch();
    //         }
    //     }
    //     catch (e) {
    //
    //     }
    // }
    //
    //
    // useEffect(() => {
    //
    //     console.log(cartStore.cart, " cart changed")
    //
    //     const interval = setTimeout(() => {
    //         updateCart()
    //     },900)
    //
    //     return () => {
    //         clearTimeout(interval)
    //     }
    // },[cartStore.cart])


    return {
        cartItems : getCartItems,
        loading : getCartItems.isLoading
    };
};