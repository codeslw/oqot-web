"use client"

import React, {ReactNode} from "react";
import {useTranslations} from "use-intl";
import {CustomBadge} from "@/components/Customs/CustomBadge";
import {stat} from "fs";
import {formatPrice} from "@/utils/services";
import Image from "next/image";

interface IOrderCard {
    createdAt : string,
    id : string,
    statusIcon : ReactNode,
    statusTitle : string,
    statusColor : string,
    price : number,
    deliveryType : string,
    goodPhotoPaths : string[],
}

export const OrderCard : React.FC<IOrderCard> = ({createdAt, id, statusIcon, statusTitle, statusColor, deliveryType, price, goodPhotoPaths}) => {

    const t = useTranslations("OrderCard");

    return <div className={"w-full p-6 rounded-3xl border border-gray-default flex flex-col space-y-6 items-start"}>
            <div className="flex justify-between w-full">
                <div className="flex flex-col space-y-4">
                    <div className="flex flex-col space-y-0">
                        <div className="text-2xl font-bold">
                            {createdAt}
                        </div>
                        <div className="text-base-light-gray">
                            {`${t('Order No')} ${id}`}
                        </div>
                    </div>
                    <CustomBadge Icon={statusIcon} title={statusTitle} color={statusColor}/>
                </div>
                <div className="flex flex-col space-y-0 items-end">
                    <div className="text-2xl font-bold">
                        {`${formatPrice(price)} ${t("sum")}`}
                    </div>
                    <div className="text-base-light-gray">
                        {deliveryType}
                    </div>
                </div>
            </div>
        <div className="flex space-x-4">
            { goodPhotoPaths.map((item) => {
                return <div className={"w-[72px] h-[72px] relative"}>
                    <Image src={item} alt={item} fill={true}/>
                </div>
            })}
        </div>
    </div>
}