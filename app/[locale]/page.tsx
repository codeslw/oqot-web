

import Image from "next/image";
import  AppStoreIcon from "@/public/icons/app-store.svg";
import PlusIcon from "@/public/icons/plus.svg";
import MinusIcon from "@/public/icons/minus.svg";

import {Button} from "@/components/Button";

import Loading from "@/app/[locale]/loading";
import {Promo} from "@/components/Promo";
import {TabCategory} from "@/components/Customs/TabCategory";
import {HomeConent} from "@/components/Contents/HomeConent";
import {Suspense} from "react";
import {PROMO_ADVERTISE_API, PROMO_CATEGORY_GOODS_API} from "@/utils/constants";
import {IPromoCategoryGoods} from "@/types/Goods";
import {IPromoAdvertiseResponse, PagedResponseDataWrapper, TCategories} from "@/types/common";
import {IPromoAdvertise} from "@/types/Promos";
import {ScrollButton} from "@/components/Customs/ScrollButton";
import {useTranslations} from "use-intl";
import {Authentication} from "@/components/Contents/Authentication";
import {AxiosResponse} from "axios";


async function getGoods() {
    const res = await fetch(`${process.env.NEXT_PUBLIC_URL}/good/paged?pageIndex=0&pageSize=12`, );
    // The return value is *not* serialized
    // You can return Date, Map, Set, etc.

    if (!res.ok) {
        // This will activate the closest `error.js` Error Boundary
        throw new Error("Failed to fetch data");
    }

    return res.json();
}

async function getCategories() {
    const res : Response = await fetch(`${process.env.NEXT_PUBLIC_URL}/category/paged?pageIndex=0&pageSize=12`,);
    // The return value is *not* serialized
    // You can return Date, Map, Set, etc.

    if (!res.ok) {
        // This will activate the closest `error.js` Error Boundary
        throw new Error("Failed to fetch data");
    }

    return res.json();
}


async  function getPromoAdvertises() {
    const  res  = await  fetch(`${process.env.NEXT_PUBLIC_URL}${PROMO_ADVERTISE_API}`)
    if(!res.ok) {
        throw new Error("Failed to fetch data");
    }
    return res.json();
}
async  function getPromoCategoryGoods() {
    const  res  = await  fetch(`${process.env.NEXT_PUBLIC_URL}${PROMO_CATEGORY_GOODS_API}`)
    if(!res.ok) {
        throw new Error("Failed to fetch data");
    }
    return res.json();
}





export default async function Home() {

    const goods = await getGoods()
    const categories = await getCategories()
    const promoCategoryGoods = await getPromoCategoryGoods();

    const  promoAdvertises : AxiosResponse<IPromoAdvertiseResponse> = await getPromoAdvertises()
    console.log(promoAdvertises.data?.promoAdvertises)

     return (<Suspense fallback={<Loading/>}>
             <div className="w-full relative">
                 <div className="hidden sm:block absolute left-0 -translate-x-[50%] z-30 top-[50%] -translate-y-[50%]">
                     <ScrollButton direction={"left"}/>
                 </div>
                 <div className="flex space-x-5 overflow-x-scroll relative">
                     {promoAdvertises?.data?.promoAdvertises?.map((advertise ) => {
                         return <Promo photoPath={advertise.highBackground} text={advertise.titleRu}/>

                     })}
                 </div>
                 <div className="hidden sm:block absolute right-0 translate-x-[50%] z-30 top-[50%] -translate-y-[50%]">
                     <ScrollButton direction={"right"}/>
                 </div>
             </div>
             <HomeConent goods={goods} categories={categories} promoCategoryGoods={promoCategoryGoods}/>
             <Authentication/>
      </Suspense>
  );
}
