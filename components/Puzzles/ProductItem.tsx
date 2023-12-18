"use client"
import React from "react";
import Image from "next/image";
import {useTranslations} from "use-intl";
import {formatPrice} from "@/utils/services";


interface  IProductItem {
    photoPath : string,
    name : string,
    price : number,
    count : number
}


export const ProductItem : React.FC<IProductItem> = ({photoPath, price, count, name}) => {

    const t = useTranslations("Order")

    return <div className={'w-full flex space-x-6 items-center py-3'}>
        <div className="w-[72px] h-[72px] relative rounded-xl overflow-hidden">
            <Image src={photoPath} alt={name} fill={true}/>
        </div>
        <div className="flex flex-col space-y-1">
            <div className="text-base-light">
                {name}
            </div>
            <div className="flex space-x-2 items-center">
                <div className="text-xs-light-gray">
                    {`${count} ${t("items")}`}
                </div>
                <div className="w-1 h-1 rounded-full bg-gray-secondary">
                </div>
                <div className="text-base-bold space-x-1">
                    {formatPrice(price)}
                    <span className={"ml-1 text-xs-light"}>{t('sum')}</span>
                </div>
            </div>
        </div>
    </div>
}