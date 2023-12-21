"use client"
import Image from "next/image";
import React, {memo, useEffect, useState} from "react";
import cartStore from "@/utils/stores/CartStore";
import {CustomProductCounterButton} from "@/components/Customs/CustomProductCounterButton";
import {Stack} from "@mui/material";
import {formatPrice} from "@/utils/services";
import {useTranslations} from "use-intl";
import {observer} from "mobx-react-lite";
import HeartIcon from "@/public/icons/heart.svg";
import HeartIconFilled from "@/public/icons/heart-filled.svg";
import {Header} from "@/components/Layout/Header";
import XIcon from "@/public/icons/x.svg";
import favouriteStore from "@/utils/stores/FavouriteStore";
import {useMutationApiAdvanced} from "@/hooks/useMutationApi";
import api from "@/api/api";
import {useQueryClient} from "@tanstack/react-query";
import UIStore from "@/utils/stores/UIStore";
interface ICartItem {
    maxCount: number;
    photoPath: string;
    name : string;
    price: number;
    id : string;
    count: number;
    goodId : string;
    discount: number;
}


 export const CartItem:React.FC<ICartItem> = memo(observer(({
                                                  maxCount,
                                                  photoPath,
                                                  name,
                                                  price,
                                                  count,
                                                  goodId,
                                                  id,
                                                  discount
 }) => {
    const t = useTranslations("Cart");
    const [innerCount, setInnerCount] = useState<number | null>(cartStore.cart.find((item) => item.goodId === goodId)?.count ?? null);
    const deleteCartItem = useMutationApiAdvanced("/goodtocart", "delete", {})
    const queryClient = useQueryClient()



     const handleIncrement = () => {
         if (innerCount  !== null &&  innerCount < maxCount) {
             setInnerCount(innerCount + 1);
         }
     };
     const handleDecrement = () => {
         if (innerCount  !== null && innerCount > 0) {
             setInnerCount(innerCount - 1);
         }
     };


     useEffect(() => {
         console.log(queryClient.getQueryData(["/goodtocart"]), " query data")
         const timer = setTimeout(() => {



             const findIndex = cartStore.cart.findIndex((item) => item.goodId === goodId);

             if (findIndex !== -1 && innerCount !== null && innerCount > 0 ) {
                 cartStore.updateGoodCountInCart(goodId, innerCount);
             }
             else if (findIndex!== -1 && innerCount === 0) {
                 cartStore.removeFromCart(goodId);
             }
             else if (findIndex === -1 &&  innerCount !== null && innerCount > 0) {
                 cartStore.addToCart({
                     id : "",
                     goodId : goodId,
                     count : innerCount,
                     maxCount : maxCount,
                     goodPrice : price,
                     goodName : name,
                     goodPhotoPath : photoPath,
                     goodDiscount : discount,
                 });
             }
             else if (findIndex === -1 && innerCount === null) {
                 return;
             }

         }, 700);



         return () => clearTimeout(timer);

     }, [innerCount]);

     const handleLikeClick = (e : React.MouseEvent<HTMLDivElement>) => {
         e.stopPropagation()
         if(favouriteStore.favouriteGoods.includes(goodId)) {
             favouriteStore.removeFromFavouriteGoods(goodId);
         }
         else  {
             favouriteStore.addToFavouriteGoods(goodId)
         }
     }

     const handleRemoveItemFromCart = async (id : string) => {
        try {
            const response = await deleteCartItem.mutateAsync({
                slug : `/${id}`
            })
            if (response.status < 400) {
                queryClient.invalidateQueries({
                    queryKey : [`/goodtocart`]
                })
            }
        }
        catch (err) {
            UIStore.setGeneralError(t("Error occurred while deleting"))
        }
     }



    return <div className={"flex space-x-6 items-center w-full py-6"}>
        <div className="flex items-center space-x-4 w-1/2">
            <Image width ={72} height={72} src={photoPath} alt={""}/>
            <div className={`max-w-full ${maxCount === 0 ? "text-base-light" : "text-base-light-gray"}`}>{name}</div>
        </div>
        <CustomProductCounterButton forCart handleIncrement={handleIncrement} handleDecrement={handleDecrement} count={innerCount ?? 0}/>
        {discount ? <Stack spacing={0} width={132}>
            <div className="text-base-bold text-orange-default">
                {formatPrice(price - (price * discount))} <span className="text-xs-light">{t("sum")}</span>
            </div>
            <div className="text-xs-bold-gray line-through">
                {formatPrice(price)} <span className="text-xs-light">{t("sum")}</span>
            </div>
        </Stack> : <div className={"text-base-bold w-[132px]"}>
            {formatPrice(price)} <span className="text-xs-light">{t("sum")}</span>
        </div>}
        <div className="flex items-center space-x-1">
            <div
                onClick={handleLikeClick}
                className="p-2 flex-center cursor-pointer">
                 {favouriteStore.favouriteGoods.includes(goodId) ? <HeartIconFilled className={"fill-red-default"}/>  : <HeartIcon className={"fill-gray-secondary hover:fill-red-default"}/>}
            </div>
            <div
                onClick={() => handleRemoveItemFromCart(id)}
                className="p-2 flex-center cursor-pointer">
                <XIcon className={"fill-gray-secondary hover:fill-gray-focus"}/>
            </div>
        </div>


    </div>;

 }))