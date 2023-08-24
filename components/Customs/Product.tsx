"use client"
import React, {useEffect, useState} from "react";
import Image from "next/image";
import {IconButton} from "@mui/material";
import PlusIcon from  "@/public/icons/plus.svg";
import MinusIcon from  "@/public/icons/minus.svg";
import {Button} from "@/components/Button";
import  Heart from  "@/public/icons/heart.svg"
import HeartFilled from  "@/public/icons/heart-filled.svg"

interface  IProduct {
    name : string
    photoPath : string,
    price : number,
    discountedPrice : number,
    availableCount : number,
    discountPercent : number

}


export const Product : React.FC<IProduct> = React.memo(({
                                                            name,
                                                            photoPath,
                                                            price,
                                                            discountedPrice,
                                                            discountPercent,
                                                            availableCount,

                                             }) => {

    const [innerCount, setInnerCount] = useState(0);
    const [isLiked, setIsLiked] = useState(false);

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
            //do some logic here
        },700);

        return () => {
            clearTimeout(timer);
        };
    }, [innerCount]);




    return (
        <div className={`w-[208px] p-3 flex flex-col space-y-4 items-center`}>
            <div className={`relative w-max h-auto flex-center overflow-hidden px-[30px] py-5 bg-white rounded-2xl`}>
                {innerCount === 0  ? <IconButton className={"flex justify-center items-center absolute z-20 top-2 right-2 rounded-xl bg-gray-background"}>
                    <PlusIcon className ="fill-black-primary"/>
                </IconButton> : <Button theme={"tertiary"}
                                        text={innerCount.toString()}
                                        startIcon={<MinusIcon onClick ={handleDecrement}/>}
                                        endIcon={<PlusIcon onClick = {handleIncrement}/>}
                />}
                <div className="relative w-[124px] h-[124px]">
                <Image src={photoPath} alt={""} fill={true} className="rounded-2xl object-contain bg-white overflow-hidden"/>
                </div>

                {isLiked ? <div className = {"absolute z-20 bottom-2 right-2 cursor-pointer"} onClick = {() => {
                        console.log("clicked")
                        setIsLiked(false)
                    }}>
                        <HeartFilled

                            className = "fill-red-default"/>
                    </div> :
                    <div className = {"absolute z-20 bottom-2 right-2 cursor-pointer"}  onClick = {() => {
                        console.log("clicked like!")
                        setIsLiked(true)
                    }}>
                        <Heart
                            className="absolute z-20 bottom-0 right-0 fill-gray-secondary"/>
                    </div>
                 }
                {discountPercent ? <div
                    className="px-2 py-0.5 rounded-2xl flex-center text-xs text-white absolute z-20 bottom-0 left-0 bg-orange-default">{`-${discountPercent}%`}</div> : null}
            </div>
            <div className="text-base-light text-center max-w-[80%] min-h-12 leading-6">
                {name}
            </div>
            <div className={`text-xl-bold text-center ${discountedPrice ? "text-orange-default" : "text-black-primary dark:text-white"}`}>
                {  discountedPrice ?
                    `${discountedPrice
                        .toLocaleString("es-US", {
                            maximumFractionDigits: 0,
                            minimumFractionDigits: 0
                        }).replace(/\,/g, " ")
                    } сум`
                    : `${price.toLocaleString("es-US", {
                            maximumFractionDigits: 0,
                            minimumFractionDigits: 0
                        }).replace(/\,/g, " ")
                    } cум`}
            </div>
            {discountedPrice
                ? <div className={`text-xs text-gray-secondary line-through`}>
                    {`${price
                        .toLocaleString("es-US", {
                            maximumFractionDigits : 0, 
                            minimumFractionDigits: 0
                        })
                        .replace(/\,/g, " ")} сум`}
                </div>
                : null
            }
        </div>
    );
});
