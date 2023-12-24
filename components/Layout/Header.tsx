"use client";
import  LogoIcon from "@/public/icons/logo.svg";
import {Button} from "@/components/Button";
import BurgerMenuIcon from  "@/public/icons/burger-menu.svg";
import {Input} from "@/components/Input";
import SearchIcon from  "@/public/icons/Search.svg";
import  PointerIcon from  "@/public/icons/pointer.svg";
import  FlagUzIcon from  "@/public/icons/Flag-1.svg";
import  FlagRuIcon from  "@/public/icons/Flag.svg";
import  FlagEnIcon from  "@/public/icons/Flag-2.svg";
import  HeartIcon from  "@/public/icons/heart.svg";
import  ShoppingCartIcon from  "@/public/icons/shopping-cart.svg";
import  UserIcon from  "@/public/icons/user.svg";
import  CircleCheckedIcon from  "@/public/icons/circle-checked.svg";
import  CircleIcon from  "@/public/icons/circle.svg";
import XIcon from "@/public/icons/x.svg";
import Burger from "@/public/icons/burger-menu.svg";
import {Menu} from "@/components/Menu";
import React, {ChangeEvent, LegacyRef, useEffect, useRef, useState} from "react";
import {IconButton, Stack, Tooltip} from "@mui/material";
import {Popup} from "@/components/Customs/Popup";
import {PickAddressPopupContent} from "@/components/Puzzles/PickAddressPopupContent";
import {useQuery} from "@tanstack/react-query";
import {useQueryApi} from "@/hooks/useQueryApi";
import {useAuth} from "@/hooks/useAuth";
import {MobileMenuContent} from "@/components/Mobile/MobileMenuContent";
import {observer} from "mobx-react-lite";
import uistore from "@/utils/stores/UIStore";
import {NestedMenu} from "@/components/NestedMenu";
import Link from "next/link";
import {HeaderIconWrapper} from "@/components/Customs/HeaderIconWrapper";
import cartStore from "@/utils/stores/CartStore";
import {getAddressDetailsText, subString} from "@/utils/services";
import AddressStore from "@/utils/stores/AddressStore";
import {useTranslations, useLocale} from "use-intl";
import {ADDRESS_LIST_URL} from "@/utils/constants";
import {ProfilePopoverContent} from "@/components/Puzzles/ProfilePopoverContent";
import {ProductSearchPopoverContent} from "@/components/Puzzles/ProductSearchPopoverContent";
import {AddressToClient, IAddressToClientData} from "@/types/common";
import {LanguagesPopovercontent} from "@/components/Puzzles/LanguagesPopovercontent";

interface IAddressItem {
    name : string,
    id : string,
    apartment : string,
    isPickup : boolean
}
interface IAddress {
    id:             string;
    clientID:       string;
    address:        string;
    entrance:       string;
    floor:          string;
    apartment:      string;
    latitude:       number;
    longitude:      number;
    addressType:    number;
    phoneNumber:    null;
    isPrivateHouse: boolean;
    createdAt:      Date;
}

interface IAdressToClientResponse {
    addressToClients : AddressToClient[];
}


interface IHeader {
    categories: any[];
}

export const Header : React.FC<IHeader> = observer(({categories}) => {

    const t = useTranslations("Common");

    const  locale = useLocale();


    const [openDrawer, setOpenDrawer] = useState(false);
    const [anchorEl, setAnchorEl] = useState<HTMLDivElement | null>(null);
    const [anchorProfile, setAnchorProfile] = useState<HTMLDivElement | null>(null);
    const [anchorLanguage, setAnchorLanguage] = useState<HTMLDivElement | null>(null);
    const [isSearching, setIsSearching] = useState(false);
    const searchRef = useRef(null);
    const [anchorSearch, setAnchorSearch] = useState<HTMLInputElement | HTMLTextAreaElement | null>(null);

    const [search, setSearch] = useState("");
    const {isUserAuthenticated} = useAuth();
    const [catalogAnchor, setCatalogAnchor] = useState<HTMLButtonElement | null>(null);

    const formatCategories = (categories : any[]) => {
        let main =[]
        return categories?.reduce((acc, next, idx,list) => {

            if(next.isMainCategory) {
                let children =  list.filter((item) => item.parentId === next.id);
                acc.push({
                    name : next.name,
                    imgUrl : next.imageUrl,
                    id : next.id,
                    children : children.map(((child) => ({
                        name : child.name,
                        id : child.id,
                        parentId : next.id
                    })))
                })
            }
            return acc;
        },[])
    }



    const handleMouseOver = (event: React.MouseEvent<HTMLDivElement>) => {
        if(anchorEl) {
            setAnchorEl(null);
        }
        else {

        setAnchorEl(event.currentTarget);
        }
    };

    const handleToggleCatalog = (event?: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        if (catalogAnchor) {
            setCatalogAnchor(null)
        }
        else {
            setCatalogAnchor(event!.currentTarget)
        }
    }


    const handleClosePopover = () => {
        setAnchorEl(null);
    };

    const handleCloseProfilePopover = (e : React.MouseEvent) => {
        e.stopPropagation()
        setAnchorProfile(null);
    }

    const handleAddressClick = () => {
        uistore.openMobileAddressPopup();
    };

    const handleLanguageClick = () => {
        uistore.openMobileLanguagePopup();
    };


    //queries
    const addresses = useQueryApi <IAdressToClientResponse , unknown, AddressToClient[], unknown>(ADDRESS_LIST_URL,
        {},
        {
        enabled : !!isUserAuthenticated,
        select : (data) => {
            return data?.data?.addressToClients ?? []
        }
    });




    const handleUserIconClick = (e : React.MouseEvent<HTMLDivElement>) => {
        if(anchorProfile) {
            e.stopPropagation()
            setAnchorProfile(null);
        }
        else {
            e.stopPropagation()
            setAnchorProfile(e!.currentTarget);
        }
    }

    const handleOpenLanguages = (e : React.MouseEvent<HTMLDivElement>) => {
        if(anchorLanguage) {
            e.stopPropagation()
            setAnchorLanguage(null);
        }
        else {
            e.stopPropagation()
            setAnchorLanguage(e.currentTarget)
        }
    }

    // const handleOpenSearch = (e : React.MouseEvent<HTMLInputElement>) => {
    //     if(anchorSearch) {
    //         e.stopPropagation()
    //         setAnchorSearch(null)
    //     }
    //     else {
    //         e.stopPropagation()
    //         setAnchorSearch(e.currentTarget!)
    //     }
    // }

    const handleSearch = (e : React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setSearch(e.target.value);
        setAnchorSearch(e.currentTarget)
    }

    const handleCloseLanguage = (e : React.MouseEvent) => {
        e.stopPropagation()
        setAnchorLanguage(null)
    }


    return (
        <>
        <div className={"sm:px-4 md:px-6 lg:px-8 py-4 w-full fixed top-0 z-50  bg-white dark:bg-black-primary sm:space-x-4 lg:space-x-6 xl:space-x-8 flex justify-between sm:justify-stretch px-6 items-center"}>
            <Link href={"/"}>
                <LogoIcon className = "hidden md:block fill-black-primary dark:fill-white text-white dark:text-black-primary cursor-pointer"/>
            </Link>
            <div className={`hidden sm:block`} >
                <Button
                    onClick={(e) => handleToggleCatalog(e)}
                    aria-describedby ="catalog"
                    theme={"tertiary"}
                    text={"Каталог"}
                    startIcon={<BurgerMenuIcon className = "fill-black-primary dark:fill-white"/>}/>
                <NestedMenu onClose={() => handleToggleCatalog()} open={!!catalogAnchor} options={formatCategories(categories)} id={"catalog"} anchorElement={catalogAnchor}/>
            </div>
            <div aria-describedby={"search"} className={"flex xs:sm:flex-grow  lg:flex-grow xs:w-max relative"}>
                <Input id={"header_search_field"} aria-describedby={"search"}
                       //onClick={handleOpenSearch}
                       ref={searchRef}

                       onChange={(e) => handleSearch(e)}
                       variant={"filled"} errorMessage={""} placeholder={"Искать в OQ-OT"} extraClasses={"flex grow"} StartIcon={SearchIcon}/>

                {!!search &&
                        <ProductSearchPopoverContent
                            onClose = {() => setSearch("")}
                            width={anchorSearch?.clientWidth ?? 100}
                            searchText={search}/>
                    }
            </div>
             <div className={"block sm:hidden"} onClick={() => setOpenDrawer(true)}>
                 <IconButton>
                     <BurgerMenuIcon className={"fill-black-primary dark:fill-white"}/>
                 </IconButton>
             </div>
            <Popup onClose={() => setOpenDrawer(false)}
                   onOpen={() => setOpenDrawer(true)}
                   open={openDrawer}
                   anchor={"bottom"}>
                <div className="flex flex-col space-y-4 p-4 rounded-2xl">
                    <MobileMenuContent
                    handleLocationClick={handleAddressClick}
                    handleLanguageClick={handleLanguageClick}
                    />
                </div>
            </Popup>
            <div aria-describedby={"location"}  onClick={handleMouseOver} className="hidden p-2 sm:flex items-center space-x-4 cursor-pointer">
                <PointerIcon
                className ="fill-black-primary dark:fill-white hover:fill-gray-secondary"
                />
                <div className="hidden xl:flex flex-col xl:w-[250px] lg:w-[200px]">
                    {AddressStore.activeAddress?.address?.length! > 24 ?
                        <Tooltip title={AddressStore.activeAddress?.address}>
                            <div className="text-base-bold">
                                {subString(AddressStore.activeAddress?.address, 24) ?? " "}
                            </div>
                        </Tooltip> :
                        <div className="text-base-bold">
                        {AddressStore.activeAddress?.address ?? t("Choose address")}
                    </div>}
                    <div className="text-xs-light-gray">
                        {getAddressDetailsText(AddressStore.activeAddress, t)}
                    </div>
                </div>

            </div>
            <Menu onClose={handleClosePopover}
                  open={!!anchorEl}
                  id={"location"}
                  classes={{
                      paper : "py-3 pl-3 pr-1"
                  }}
                  elevation={1}
                  anchorEl={anchorEl}
                  disableRestoreFocus
                 >
                <Stack className={"w-full overflow-y-auto max-h-80"}>
                    <PickAddressPopupContent addresses={addresses.data ?? []} pickedAddressId={""} onClose={handleClosePopover}/>
                </Stack>
            </Menu>

            <nav className="sm:flex space-x-0 w-max hidden">
                <HeaderIconWrapper onClick={handleOpenLanguages}>
                    {locale === "uz" ?  <FlagUzIcon aria-describedby={"language"} className={"rounded-full"}/>
                        : locale === "en" ? <FlagEnIcon aria-describedby={"language"} className={"rounded-full"}/>
                            : <FlagRuIcon aria-describedby={"language"} className={"rounded-full"}/>}
                </HeaderIconWrapper>
                <Menu open={!!anchorLanguage}
                      id={"language"}
                      classes={{
                          paper: "py-3 px-3 pr-1"
                      }}
                      onClose={handleCloseLanguage}
                      anchorEl={anchorLanguage}
                >
                    <LanguagesPopovercontent/>
                </Menu>

                <HeaderIconWrapper>
                    <Link href={"/favourites"}>
                        <HeartIcon className = "fill-black-primary dark:fill-white hover:fill-gray-secondary"/>
                    </Link>
                </HeaderIconWrapper>
                <HeaderIconWrapper>
                    <Link href={"/cart"}>
                        <div className={"w-5 h-5 text-xs-bold flex-center text-white rounded-full bg-red-default absolute top-0 right-0"}>
                            {cartStore.cart?.length}
                        </div>
                        <ShoppingCartIcon className="fill-black-primary dark:fill-white hover:fill-gray-secondary"/>
                    </Link>
                </HeaderIconWrapper>
                <HeaderIconWrapper onClick={handleUserIconClick}>
                    <UserIcon aria-describedby={"profile"} className="fill-black-primary dark:fill-white hover:fill-gray-secondary"/>
                </HeaderIconWrapper>
                 <Menu onClose={handleCloseProfilePopover}
                                         open={!!anchorProfile}
                                         id={"profile"}
                                         classes={{
                                             paper: "py-3 pl-3 pr-1"
                                         }}
                                         elevation={1}
                                         anchorEl={anchorProfile}
                                        // disableRestoreFocus
                >
                    <div className={"w-max h-max no-scrollbar"}>
                        <ProfilePopoverContent onClose={handleCloseProfilePopover}/>
                    </div>
                </Menu>
            </nav>
        </div>

            </>
    );
});
