"use client"

import {ReactNode, useEffect} from "react";
import {useSynchronizeCart} from "@/hooks/useSynchronizeCart";
import {observer} from "mobx-react-lite";
import cartStore from "@/utils/stores/CartStore";
import {autorun, reaction, toJS} from "mobx";
import {useQueryApi} from "@/hooks/useQueryApi";
import {GOOD_TO_CART_URL, REPLACE_CART_URL} from "@/utils/constants";
import {ICart} from "@/types/common";
import {useMutationApi} from "@/hooks/useMutationApi";

interface ICartSynchronizeWrapper {
    children : ReactNode
}

export const CartSynchronizeWrapper : React.FC<ICartSynchronizeWrapper> = observer(({children}) => {

    const getCartItems = useQueryApi(GOOD_TO_CART_URL,{}, {
        refetchOnWindowFocus : false,
        refetchOnMount : false,
        onSuccess : (data) => {
            const formattedCartItems = data?.data?.goodToCarts?.map((item : ICart) => ({...item, clientId : undefined, id : undefined}));
            cartStore.setCart(formattedCartItems);
        }
    });

    const replaceCartItems = useMutationApi(REPLACE_CART_URL, "put", {});

    useEffect(() => {
        const reactionDisposer = reaction(
            () => toJS(cartStore.cart), // Convert the observable 'cart' to a plain JS object
            async (cart) => {
                const check =  JSON.stringify(cartStore.cart) !== JSON.stringify(getCartItems.data?.data?.goodToCarts?.map((item : ICart) => ({...item, clientId : undefined, id : undefined})) ?? []);
                console.log(JSON.stringify(cartStore.cart), " check");
                console.log(JSON.stringify(getCartItems.data?.data?.goodToCarts?.map((item : ICart) => ({...item, clientId : undefined, id : undefined})) ?? []))
                if(!getCartItems.isLoading && (getCartItems.data) && check) {
                    try {
                        const response = await  replaceCartItems.mutateAsync(cartStore.cart.map((item) => ({
                            id : item.goodId,
                            count : item.count
                        })))
                    }
                    catch (e) {

                    }
                }
            }
        );

        return () => {
            reactionDisposer(); // This will stop the reaction when the component unmounts
        };
    }, [getCartItems.data]);


    return <>
        {children}
    </>
})