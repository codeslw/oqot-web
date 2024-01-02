"use client"
import {Link, Stack} from "@mui/material";
import React, {useMemo} from "react";
import HeartIcon from "@/public/icons/heart.svg"
import CartIcon from "@/public/icons/shopping-cart.svg"
import ProfileIcon from "@/public/icons/user.svg"
import  FlagUzIcon from "@/public/icons/Flag-1.svg";
import  PointerIcon from "@/public/icons/pointer.svg";


interface IMobileMenuContent {
    handleLocationClick : () => void,
    handleLanguageClick : () => void
}


export const MobileMenuContent:React.FC<IMobileMenuContent> = ({handleLocationClick, handleLanguageClick}) => {



    const menuOptions = useMemo(() => {
        return [

            {Icon : FlagUzIcon, title : "Язык", path : "/languages", handler : handleLanguageClick, key : "language" },
            {Icon : HeartIcon, title : "Избранные", path : "/favourites", key : "favourites"},
            {Icon : CartIcon, title : "Корзина", path : "/cart", key : "cart"},
            {Icon : ProfileIcon, title : "Избранные", path : "/favourites", key : "favourites"},
            {Icon : PointerIcon, title : "Локация", path : "/location", handler : handleLocationClick, key : "location"},

        ];
    }, []);


    return (
        <Stack gap={1}>
            {menuOptions.map(({Icon, title, path, handler , key}) => {
                return (<Link
                    onClick = {(e) => {
                        if (handler) {
                        e.preventDefault()

                            handler()
                        }
                    }}
                    href={path} className={`w-full space-x-4 p-3 flex no-underline`}>
                    <Icon className={`dark:fill-black-primary fill-gray-secondary ${key === "language" ? "rounded-full" : ""}`}/>
                    <div className="text-base-bold dark:text-black-primary">
                        {title}
                    </div>
                </Link>)
            })}
        </Stack>
    );
};
