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

//OPTIONS


export const languageOptions =  [
        {key : "uz", Icon : FlagUzIcon, title : "O'zbekcha"},
        {key : "ru", Icon : FlagRuIcon, title : "Русский"},
        {key : "en", Icon : FlagEnIcon, title : "English"},
    ];


//DEFAULTS

export const ACCESS_TOKEN_KEY = "accessToken"





