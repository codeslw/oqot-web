"use client"
import Image from "next/image";
import {memo, useEffect, useState} from "react";
import cartStore from "@/utils/stores/CartStore";
import {CustomProductCounterButton} from "@/components/Customs/CustomProductCounterButton";
import {Stack} from "@mui/material";
import {formatPrice} from "@/utils/services";
import {useTranslations} from "use-intl";
import {observer} from "mobx-react-lite";
import HeartIcon from "@/public/icons/heart.svg";
import {Header} from "@/components/Layout/Header";
import XIcon from "@/public/icons/x.svg";
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
     const [innerCount, setInnerCount] = useState(cartStore.cart.find((item) => item.goodId === id)?.count ?? 0);

     const handleIncrement = () => {
         if (innerCount < maxCount) {
             setInnerCount(innerCount + 1);
         }
     };
     const handleDecrement = () => {
         if (innerCount > 0) {
             setInnerCount(innerCount - 1);
         }
     };


     useEffect(() => {

         const timer = setTimeout(() => {

             const findIndex = cartStore.cart.findIndex((item) => item.goodId === id);

             if (findIndex !== -1 && innerCount > 0) {
                 cartStore.updateGoodCountInCart(goodId, innerCount);
             }
             else if (findIndex!== -1 && innerCount === 0) {
                 cartStore.removeFromCart(goodId);
             }
             else if (findIndex === -1 && innerCount > 0) {
                 cartStore.addToCart({
                     goodId : goodId,
                     count : innerCount,
                     maxCount : maxCount,
                     goodPrice : price,
                     goodName : name,
                     goodPhotoPath : photoPath,
                     goodDiscount : discount,
                 });
             }
             else if (findIndex === -1 && innerCount === 0) {
                 return;
             }

         }, 700);



         return () => clearTimeout(timer);

     }, [innerCount]);



    return <div className={"flex space-x-6 items-center w-full py-6"}>
        <div className="flex items-center space-x-4 w-1/2">
            <Image width ={72} height={72} src={photoPath} alt={""}/>
            <div className={`max-w-full ${maxCount === 0 ? "text-base-light" : "text-base-light-gray"}`}>{name}</div>
        </div>
        <CustomProductCounterButton forCart handleIncrement={handleIncrement} handleDecrement={handleDecrement} count={innerCount}/>
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
            <div className="p-2 flex-center">
                <HeartIcon className={"fill-gray-secondary"}/>
            </div>
            <div className="p-2 flex-center">
                <XIcon className={"fill-gray-secondary"}/>
            </div>
        </div>


    </div>;

 }))