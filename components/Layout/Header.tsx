"use client"
import  LogoIcon from "@/public/icons/logo.svg"
import {Button} from "@/components/Button";
import BurgerMenuIcon from  "@/public/icons/burger-menu.svg"
import {Input} from "@/components/Input";
import SearchIcon from  "@/public/icons/Search.svg"
import  PointerIcon from  "@/public/icons/pointer.svg"
import  FlagUzIcon from  "@/public/icons/Flag-1.svg"
import  FlagRuIcon from  "@/public/icons/Flag.svg"
import  FlagEnIcon from  "@/public/icons/Flag-2.svg"
import  HeartIcon from  "@/public/icons/heart.svg"
import  ShoppingCartIcon from  "@/public/icons/shopping-cart.svg"
import  UserIcon from  "@/public/icons/user.svg"
import  CircleCheckedIcon from  "@/public/icons/circle-checked.svg"
import  CircleIcon from  "@/public/icons/circle.svg"
import XIcon from "@/public/icons/x.svg"

import {Menu} from "@/components/Menu";
import {LegacyRef, useRef, useState} from "react";



export const Header = () => {

    const [anchorEl, setAnchorEl] = useState<HTMLDivElement | null>(null);
    const handleMouseOver = (event: React.MouseEvent<HTMLDivElement>) => {
        if(anchorEl) {
            setAnchorEl(null)
        }
        else {

        setAnchorEl(event.currentTarget);
        }
    };


    const handleClosePopover = () => {
        setAnchorEl(null)
    }

    return (
        <div
        className={"sm:px-4 md:px-6 lg:px-8 py-4 w-full  bg-white dark:bg-black-primary sm:space-x-4 lg:space-x-6 xl:space-x-8 flex justify-between sm:justify-stretch px-6 items-center"}
        >
            <LogoIcon
            className = "hidden md:block fill-black-primary dark:fill-white text-white dark:text-black-primary"
            />
            <Button theme={"tertiary"} text={"Каталог"} startIcon={<BurgerMenuIcon className = "fill-black-primary dark:fill-white"/>}/>
            <div className={"flex lg:flex-grow xs:w-max"}>
                <Input variant={"filled"} errorMessage={""} placeholder={"Искать в OQ-OT"} extraClasses={"flex grow"} StartIcon={SearchIcon}/>
            </div>
            <div aria-describedby={"location"}  onClick={handleMouseOver} className="p-2 flex items-center space-x-4 cursor-pointer">
                <PointerIcon
                className ="fill-black-primary dark:fill-white hover:fill-gray-secondary"
                />
                <div className="hidden xl:flex flex-col">
                    <div className="text-base-bold">
                        {"1-й проезд Мукимий, 9А"}
                    </div>
                    <div className="text-xs-light-gray">
                        {"Доставка 30-40 минут"}
                    </div>
                </div>

            </div>
            <Menu onClose={handleClosePopover} open={!!anchorEl} id={"location"}
                  elevation={1}
                  anchorEl={anchorEl} disableRestoreFocus  slotProps={{root :{

                } }}>
                <div className={"flex flex-col space-y-0"}>
                    <div className="text-xl-bold px-4 py-3 dark:text-black-primary">
                        {"Мои адреса"}
                    </div>
                    <div className="p-4 flex space-x-4 items-center cursor-pointer hover:bg-gray-background-focus">
                        <CircleCheckedIcon/>
                        <div className="flex flex-col space-y-0 grow ">
                            <div className="text-base-bold dark:text-black-primary">{"1-й проезд Мукимий, 9А"}</div>
                            <div className="text-xs-light-gray ">{"Квартира 103"}</div>
                        </div>
                        <XIcon className ="ml-auto fill-gray-secondary dark:fill-gray-secondary-dark"/>
                    </div>
                    <div className="p-4 flex space-x-4 items-center cursor-pointer hover:bg-gray-background-focus">
                        <CircleIcon/>
                        <div className="flex flex-col space-y-0 grow">
                            <div className="text-base-bold dark:text-black-primary">{"проезд Тутзор, 46"}</div>
                            <div className="text-xs-light-gray">{"Пункт самовывоза"}</div>
                        </div>
                        <XIcon className ="ml-auto fill-gray-secondary dark:fill-gray-secondary-dark"/>
                    </div>
                </div>
            </Menu>

            <nav className="sm:flex space-x-0 w-max hidden">
                <div className="w-12 h-12 flex justify-center items-center cursor-pointer">
                    <FlagUzIcon className={"rounded-full"}/>
                </div>
                <div className="w-12 h-12 flex justify-center items-center cursor-pointer">
                    <HeartIcon className = "fill-black-primary dark:fill-white hover:fill-gray-secondary"/>
                </div>
                <div className="w-12 h-12 flex justify-center items-center cursor-pointer">
                    <ShoppingCartIcon className="fill-black-primary dark:fill-white hover:fill-gray-secondary">

                    </ShoppingCartIcon>
                </div>
                <div className="w-12 h-12 flex justify-center items-center cursor-pointer">
                    <UserIcon
                        className="fill-black-primary dark:fill-white hover:fill-gray-secondary"
                    />
                </div>
            </nav>
        </div>
    );
};
