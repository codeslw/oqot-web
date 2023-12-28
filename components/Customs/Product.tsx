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
import {formatPrice, localize} from "@/utils/services";
import {observable, runInAction} from "mobx";
import {observer} from "mobx-react-lite";
import cartStore, {ICartState} from "@/utils/stores/CartStore";
import {useQueryParams} from "@/hooks/useQueryParams";
import {usePathname, useRouter} from "next/navigation";
import {useMutationApi} from "@/hooks/useMutationApi";
import favouriteStore from "@/utils/stores/FavouriteStore";


interface  IProduct {
    id : string;
    name : string
    photoPath : string,
    price : number,
    discountedPrice : number,
    availableCount : number,
    discountPercent : number,
    onClick?: () => void;
    lightBackground?: boolean;
}


export const Product :React.FC<IProduct>  = memo(observer(({
                                                            id,
                                                            name,
                                                            photoPath,
                                                            price,
                                                            discountedPrice,
                                                            discountPercent,
                                                            availableCount,
                                                            lightBackground,
                                                            onClick

                                             }) => {

    const [innerCount, setInnerCount] = useState(cartStore?.cart?.find((item) => item.goodId === id)?.count ?? null);
    const [isLiked, setIsLiked] = useState(false);
    const [updateStarted, setUpdateStarted] = useState(false);

    const {createQueryString} = useQueryParams();
    const pathname = usePathname();
    const router = useRouter()

    //mutations
    const makeFavourite = useMutationApi("/favoritegood", "post", {});
    const deleteFavourite = useMutationApi("/favoritegood", "delete", {})

    const handleIncrement = (e : any) => {
        e.stopPropagation();
        if((innerCount ?? 0) < availableCount){
        setInnerCount(prev => (prev ?? 0)  + 1);
        }
    };

    const handleDecrement = (e : any) => {
        e.stopPropagation()
        if( (innerCount ?? 0) > 0){
        setInnerCount(prev => (prev ?? 0) - 1);
        }
    };

    useEffect(() => {
        const timer = setTimeout(() => {

            const foundIndex = cartStore?.cart?.findIndex((item :ICartState) => item.goodId === id);

            if( innerCount !== null && innerCount > 0 && foundIndex === - 1) {
                cartStore?.addToCart({
                    id : "",
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
            else if(innerCount !== null &&  innerCount > 0 && foundIndex!== - 1) {
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

    const handleClickProduct = (id  : string) => {
        router.push(`${pathname}?${createQueryString("goodId", id)}`)
    }


    const handleLikeClick = (e : React.MouseEvent<HTMLDivElement>) => {
        e.stopPropagation()
        if(favouriteStore.favouriteGoods.includes(id)) {
           favouriteStore.removeFromFavouriteGoods(id);
        }
        else  {
            favouriteStore.addToFavouriteGoods(id)
        }
    }




    return (
        <div onClick={(e) => {
            e.stopPropagation()
            handleClickProduct(id)
        }} className={`w-full p-1 lg:p-3 flex flex-col space-y-4 items-center`}>
            <div className={`relative w-full aspect-square flex-center overflow-hidden px-2 py-1 xl:px-[30px] xl:py-5 bg-white rounded-2xl`}>
                {(innerCount === 0 || innerCount === null)  ? <IconButton
                    onClick={handleIncrement}
                    className={"flex justify-center items-center absolute z-20 top-2 right-2 !p-[6px] w-9 !h-9  rounded-xl bg-gray-background hover:bg-gray-focus"}>
                    <PlusIcon className ="fill-black-primary"/>
                </IconButton> : <CustomProductCounterButton count={innerCount ?? 0} handleIncrement={handleIncrement} handleDecrement={handleDecrement}/>}
                <div className="relative w-full h-full">
                <Image src={photoPath} alt={""} fill={true} className="rounded-2xl object-contain bg-white overflow-hidden"/>
                </div>

                {favouriteStore.favouriteGoods.includes(id) ? <div className = {"absolute z-20 bottom-1 right-1 cursor-pointer"} onClick = {handleLikeClick}>
                        <HeartFilled

                            className = "fill-red-default z-20 bottom-1 right-1"/>
                    </div> :
                    <div className = {"absolute z-20 bottom-0 right-0 cursor-pointer"}  onClick = {handleLikeClick}>
                        <Heart
                            className="absolute z-20 bottom-1 right-1 fill-gray-secondary hover:fill-red-default"/>
                    </div>
                 }
                {discountPercent ? <div
                    className="px-2 py-0.5 rounded-2xl flex-center text-xs text-white absolute z-20 bottom-1 left-1 md:bottom-2 md:left-2 bg-orange-default">{`-${parseInt((discountPercent * 100)?.toString())}%`}</div> : null}
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
            <div className={`font-normal text-xs   ${ lightBackground ? "dark:text-black-primary" : "dark:text-white"} md:text-sm xl:text-base text-center max-w-[80%] h-8 md:h-10 xl:min-h-12 xl:max-h-12 xl:h-12  break-all overflow-hidden`}>
                {name}
            </div>
            </Tooltip>
            <div className={`font-semibold text-sm md:text-base xl:text-xl-bold text-center ${discountPercent ? "text-orange-default" : `${lightBackground ? "text-black-primary dark:text-black-primary" : "text-black-primary dark:text-white"} `}`}>

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
