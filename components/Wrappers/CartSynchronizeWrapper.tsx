"use client"

import {ReactNode, useEffect} from "react";
import {useSynchronizeCart} from "@/hooks/useSynchronizeCart";
import {observer} from "mobx-react-lite";
import cartStore from "@/utils/stores/CartStore";
import {autorun, reaction, toJS} from "mobx";
import {useQueryApi} from "@/hooks/useQueryApi";
import {FAVOURITES_URL, GOOD_TO_CART_URL, REPLACE_CART_URL, REPLACE_FAVOURITES_URL} from "@/utils/constants";
import {ICart} from "@/types/common";
import {useMutationApi} from "@/hooks/useMutationApi";
import favouriteStore from "@/utils/stores/FavouriteStore";
import {IFavouriteGood} from "@/types/Goods";
import {useQueryClient} from "@tanstack/react-query";

interface ICartSynchronizeWrapper {
    children : ReactNode
}

export const CartSynchronizeWrapper : React.FC<ICartSynchronizeWrapper> = observer(({children}) => {

    const queryClient = useQueryClient()

    const getCartItems = useQueryApi(GOOD_TO_CART_URL,{}, {
        refetchOnWindowFocus : false,
        refetchOnMount : false,
        onSuccess : (data) => {
            const formattedCartItems = data?.data?.goodToCarts?.map((item : ICart) => ({...item, clientId : undefined}));
            cartStore.setCart(formattedCartItems);
        }
    });

    const getFavourites = useQueryApi(FAVOURITES_URL, {}, {
        refetchOnWindowFocus : false,
        refetchOnMount : false,
        onSuccess : (data) => {
            const hasDifference = JSON.stringify(favouriteStore.favouriteGoods) !== JSON.stringify(data?.data?.favoriteGoods?.map((item : IFavouriteGood) => (item.good.id)));

            if(hasDifference) {
                favouriteStore.setFavouriteGoods(data?.data?.favoriteGoods?.map((item : IFavouriteGood) => (item.good.id)) ?? [])
            }

        }
    });

    const replaceCartItems = useMutationApi(REPLACE_CART_URL, "put", {});

    const replaceFavourites = useMutationApi(REPLACE_FAVOURITES_URL, "post", {})

    useEffect(() => {
        const reactionDisposer = reaction(
            () => toJS(cartStore.cart), // Convert the observable 'cart' to a plain JS object
            async (cart) => {
                const check =  JSON.stringify(cartStore.cart) !== JSON.stringify(getCartItems.data?.data?.goodToCarts?.map((item : ICart) => ({...item, clientId : undefined})) ?? []);
                console.log(cart, " before replace", check);
                if(!getCartItems.isLoading && (getCartItems.data) && check) {
                    console.log("replace triggered", check , cart)
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


    useEffect(() => {
        const reactionDisposerFavorite = reaction(
            () => toJS(favouriteStore.favouriteGoods),
            async (favourites) => {
                console.log(favourites, " favorites");

                const check = JSON.stringify(favourites) !== JSON.stringify(getFavourites.data?.data?.favoriteGoods?.map((item : IFavouriteGood) => (item.good.id)));
              //  console.log( JSON.stringify(favouriteStore.favouriteGoods),  JSON.stringify(getFavourites.data?.data?.favoriteGoods?.map((item : IFavouriteGood) => (item.good.id))), "check")
                console.log(check, " check")
                if(!getFavourites.isFetching && !replaceFavourites.isLoading &&  getFavourites.data && check) {
                    try {
                        console.log("favourites replace triggered")
                        const response = await replaceFavourites.mutateAsync({
                            goodIds: [...favourites]
                        })
                        if (response.status < 400) {
                            queryClient.invalidateQueries({
                                queryKey: [FAVOURITES_URL]
                            })

                        }
                    }
                    catch (e) {

                    }
                }
            }
        )

        return () => {
            reactionDisposerFavorite()
        }
    }, [getFavourites.data]);


    return <>
        {children}
    </>
})