"use client"
import ActiveLineSmall from "@/public/icons/active_line0.svg"
import ActiveLineMedium from "@/public/icons/active_line1.svg"
import ActiveLineLarge from "@/public/icons/active_line2.svg"
import TransparentLine from "@/public/icons/active_line2.svg"
import CircleTick from "@/public/icons/circle-tick.svg"
import Cube from "@/public/icons/cube.svg"
import Car from "@/public/icons/car.svg"
import {useTranslations} from "use-intl";
import {useMemo} from "react";


interface IOrderProcessStatus {
    status: "created" | "collecting" | "on_way" | "completed"
}

export const OrderProcessStatus: React.FC<IOrderProcessStatus> = ({status}) => {

    const t = useTranslations("Order");

    console.log(status, " status")

    const statusTexts = useMemo(() => {
        return {
            "created" : t("Order created"),
            "collecting" : t("Order collecting"),
            "on_way" : t("Order on way"),
            "completed" : t("Order completed"),
        }
    }, [status, t]);


    const statusDeliverytexts = useMemo(() => {
        return {
            "created" : t("Order will be delivered in 30 minutes"),
            "collecting" : t("Order will be delivered in 35 minutes"),
            "on_way" : t("Order will be delivered in 40 minutes"),
            "completed" : t("Order will be delivered in 45 minutes"),
        }
    }, [status]);

    return <div className={'flex items-center space-x-5'}>
        <div className="w-12 h-12 rounded-full relative flex justify-center items-center">
            {status === "created" && <ActiveLineSmall className={"absolute top-0 left-0"}/>}
            {status === "collecting" && <ActiveLineMedium className={"absolute top-0 left-0"}/>}
            {status === "on_way" && <ActiveLineLarge className={"absolute top-0 left-0 rotate-180"}/>}

            {status === "created" && <CircleTick className={"fill-orange-default text-orange-default"}/>}
            {status === "collecting" && <Cube className={"fill-orange-default text-orange-default"}/>}
            {status === "on_way" && <Car className={"fill-orange-default text-orange-default"}/>}
        </div>
        <div className="flex flex-col space-y-0">
            <div className="text-xl-bold">
                {statusTexts[status]}
            </div>
            <div className="text-base-light-gray">
                {statusDeliverytexts[status]}
            </div>
        </div>

    </div>
}