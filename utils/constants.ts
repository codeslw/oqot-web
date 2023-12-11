//URLS
import {useMemo} from "react";
import FlagUzIcon from "@/public/icons/Flag-1.svg";
import FlagRuIcon from "@/public/icons/Flag.svg";
import FlagEnIcon from "@/public/icons/Flag-2.svg";
import exp from "constants";

export const BASE_URL = process.env.NEXT_PUBLIC_URL;
export const AUTH_BASE_URL = process.env.NEXT_PUBLIC_AUTH_URL;
export const PROMO_CATEGORY_GOODS_API = "/good/main/promo"
export const  PROMO_ADVERTISE_API = "/promoadvertise/actual"
export const USER_SEND_CODE_URL = "/verify/send"
export const USER_VERIFY_URL = "/verify"

export const REGISTER_URL = "/auth/register"
export const FILE_UPLOAD_URL = "/file/upload"

export const CART_DELETE_ALL_URL = "/goodtocart/all"
export  const GOOD_TO_CART_URL = "/goodtocart"
export const REPLACE_CART_URL = "/goodtocart/many"
export const FAVORITE_URL = "/favoritegood"

export const GET_GOOD_BY_CATEGORY = "/good/category"
export const GET_SUB_CATEGORIES_BY_CATEGORY = "/good/subcategory/category"
export const GET_PROMOCATEGORIES_PAGED = "/good/paged/promocategory"
export const GET_GOOD_SEARCH = "/good/search"
export const GET_CATEGORY_SEARCH = "/category/search"


export const ADDRESS_LIST_URL = "/addresstoclient"
export const DELETE_ADDRESS_URL = "/addresstoclient"

export const  FAVOURITES_URL = "/favoritegood"
export const  REPLACE_FAVOURITES_URL = "/favoritegood/many"
//OPTIONS


export  const YANDEX_MAPS_SEARCH_URL = `https://search-maps.yandex.ru/v1/?apikey=897ef55a-69ad-4232-9fd1-f5f01f1145b1&lang=ru_Ru&ll=69.241553,41.311533&spn=0.138252,0.086425`


export const languageOptions =  [
        {key : "uz", Icon : FlagUzIcon, title : "O'zbekcha"},
        {key : "ru", Icon : FlagRuIcon, title : "Русский"},
        {key : "en", Icon : FlagEnIcon, title : "English"},
    ];


//DEFAULTS

export const ACCESS_TOKEN_KEY = "accessToken"
export const PICKUP_COORDINATES = [41.318495, 69.287357]
export const PROMO_CATEGORY_GOODS_PAGE_SIZE = 5;
export const FOOTER_HEIGHT = 188;
export const HEADER_HEIGHT = 88;
export const  SUPPORT_PHONE_NUMBER = "+998 (00) 000-00-00"

export const PaymentTypes : {[key : number] : string} = {
    0 : 'Cash',
    2 : 'Olnline by Card'
}


