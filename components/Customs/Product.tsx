"use client";
import React, {memo, useEffect, useState} from "react";
import Image from "next/image";
import {IconButton, Tooltip} from "@mui/material";
import PlusIcon from  "@/public/icons/plus.svg";
import MinusIcon from  "@/public/icons/minus.svg";
import {Button} from "@/components/Button";
import  Heart from  "@/public/icons/heart.svg";
import HeartFilled from  "@/public/icons/heart-filled.svg";
import {CustomProductCounterButton} from "@/components/Customs/CustomProductCounterButton";
import {formatPrice} from "@/utils/services";
import {observable} from "mobx";
import {observer} from "mobx-react-lite";
import cartStore, {ICartState} from "@/utils/stores/CartStore";


interface  IProduct {
    id : string;
    name : string
    photoPath : string,
    price : number,
    discountedPrice : number,
    availableCount : number,
    discountPercent : number,
    onClick?: () => void;

}


export const Product :React.FC<IProduct>  = memo(observer(({
                                                            id,
                                                            name,
                                                            photoPath,
                                                            price,
                                                            discountedPrice,
                                                            discountPercent,
                                                            availableCount,
                                                            onClick

                                             }) => {

    const [innerCount, setInnerCount] = useState(cartStore?.cart?.find((item) => item.goodId === id)?.count ?? 0);
    const [isLiked, setIsLiked] = useState(false);
    const [updateStarted, setUpdateStarted] = useState(false);
    const handleIncrement = () => {
        if(innerCount < availableCount){
        setInnerCount(prev => prev  + 1);
        }
    };

    const handleDecrement = () => {
        if(innerCount > 0){
        setInnerCount(prev => prev - 1);
        }
    };

    useEffect(() => {
        const timer = setTimeout(() => {

            const foundIndex = cartStore?.cart?.findIndex((item :ICartState) => item.goodId === id);

            if(innerCount > 0 && foundIndex === - 1) {
                cartStore?.addToCart({
                    count : innerCount,
                    maxCount : availableCount,
                    goodDiscount : discountPercent,
                    goodPrice : price,
                    goodId : id,
                    goodName : name,
                    goodPhotoPath : photoPath,
                });
            }
            else if(innerCount === 0 && foundIndex !== - 1) {
                cartStore?.removeFromCart(id);
            }
            else if(innerCount > 0 && foundIndex!== - 1) {
                cartStore?.updateGoodCountInCart(id, innerCount);
            }
            else if(innerCount === 0 && foundIndex === - 1) {
                return;
            }

        },700);

        return () => {
            clearTimeout(timer);
        };
    }, [innerCount]);


    return (
        <div onClick={onClick} className={`w-full p-1 lg:p-3 flex flex-col space-y-4 items-center`}>
            <div className={`relative w-full aspect-square flex-center overflow-hidden px-2 py-1 xl:px-[30px] xl:py-5 bg-white rounded-2xl`}>
                {innerCount === 0  ? <IconButton
                    onClick={handleIncrement}
                    className={"flex justify-center items-center absolute z-20 top-2 right-2 !p-[6px] w-9 !h-9  rounded-xl bg-gray-background"}>
                    <PlusIcon className ="fill-black-primary"/>
                </IconButton> : <CustomProductCounterButton count={innerCount} handleIncrement={handleIncrement} handleDecrement={handleDecrement}/>}
                <div className="relative w-full h-full">
                <Image src={photoPath} alt={""} fill={true} className="rounded-2xl object-contain bg-white overflow-hidden"/>
                </div>

                {isLiked ? <div className = {"absolute z-20 bottom-1 right-1 cursor-pointer"} onClick = {() => {

                        setIsLiked(false);
                    }}>
                        <HeartFilled

                            className = "fill-red-default z-20 bottom-1 right-1"/>
                    </div> :
                    <div className = {"absolute z-20 bottom-0 right-0 cursor-pointer"}  onClick = {() => {

                        setIsLiked(true);
                    }}>
                        <Heart
                            className="absolute z-20 bottom-1 right-1 fill-gray-secondary"/>
                    </div>
                 }
                {discountPercent ? <div
                    className="px-2 py-0.5 rounded-2xl flex-center text-xs text-white absolute z-20 bottom-1 left-1 md:bottom-2 md:left-2 bg-orange-default">{`-${discountPercent * 100}%`}</div> : null}
            </div>
            <Tooltip
                placement={"bottom"}
                arrow={true}
                color={"black"} slotProps={{
                tooltip : {
                    className : "bg-white text-black-primary w-[10rem] rounded-lg font-medium text-xs"
                },
                arrow : {
                    className : "text-white"
                }
            }} title={name}>
            <div className="font-normal text-xs   dark:text-white md:text-sm xl:text-base text-center max-w-[80%] h-8 md:h-10 xl:min-h-12 xl:max-h-12 xl:h-12  break-all overflow-hidden">
                {name}
            </div>
            </Tooltip>
            <div className={`font-semibold text-sm md:text-base xl:text-xl-bold text-center ${discountPercent ? "text-orange-default" : "text-black-primary dark:text-white"}`}>
                {discountedPrice ?
                    `${formatPrice(discountedPrice)} сум`
                    : `${formatPrice(price) } cум`}
            </div>
            {discountPercent
                ? <div className={`text-xs text-gray-secondary line-through`}>
                    {`${formatPrice(price)} сум`}
                </div>
                : null
            }
        </div>
    );
}));
