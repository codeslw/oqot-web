"use client"


import React from "react";
import {useTranslations} from "use-intl";
import {CustomBadge} from "@/components/Customs/CustomBadge";
import {stat} from "fs";

interface IOrderCard {
    createdAt : string,
    id : string,
    statusIcon : () => JSX.Element,
    statusTitle : string,
    statusColor : string,
    price : number,
    deliveryType : string,
}

export const OrderCard : React.FC<IOrderCard> = ({createdAt, id, statusIcon, statusTitle, statusColor}) => {

    const t = useTranslations("OrderCard");

    return <div className={"w-full p-6 rounded-3xl border border-gray-default flex flex-col space-y-6 items-start"}>
            <div className="flex justify-between">
                <div className="flex flex-col space-y-4">
                    <div className="flex flex-col space-y-0">
                        <div className="text-2xl font-bold">
                            {createdAt}
                        </div>
                        <div className="text-base-light-gray">
                            {t('Order No', {orderNo : id})}
                        </div>
                    </div>
                    <CustomBadge Icon={statusIcon} title={statusTitle} color={statusColor}/>

                </div>
            </div>
    </div>
}