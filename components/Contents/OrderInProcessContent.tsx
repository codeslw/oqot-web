"use client"

import {Breadcrumbs, Grid, Stack} from "@mui/material";
import {CustomBreadCrumb} from "@/components/Customs/CustomBreadCumb";
import {useTranslations} from "use-intl";
import {useMemo} from "react";
import {useParams, useRouter} from "next/navigation";
import {OrderProcessStatus} from "@/components/Puzzles/OrderProcessStatus";
import {YandexMap} from "@/components/Customs/YandexMap";
import {PaymentTypes, PICKUP_COORDINATES} from "@/utils/constants";
import ChatIcon from "@/public/icons/chat.svg";
import RightChevron from "@/public/icons/right-chevron.svg";
import PhoneIcon from "@/public/icons/phone.svg";
import {CartPriceInfoPanel} from "@/components/Puzzles/CartPriceInfoPanel";
import DownArrowIcon from "@/public/icons/down-arrow.svg";
import CartStore from "@/utils/stores/CartStore";
import {ProductItem} from "@/components/Puzzles/ProductItem";
import {useQueryApi} from "@/hooks/useQueryApi";
import {formatDateOrder, formatPhoneNumber} from "@/utils/services";
import {IGoodToOrder} from "@/types/Order";



export const OrderInProcessContent = () => {
    const t = useTranslations("Order");
    const {orderId} = useParams();

    const order  = useQueryApi(`/order/${orderId}/client`, {}, {
        select : (data) => {
            return data.data
        }
    });


    const orderCoords = useMemo(() => {
        return order.data?.toLatitude && order.data?.toLongitude ? [order.data.toLatitude, order.data.toLongitude] : PICKUP_COORDINATES
    }, [order.data]);

    const orderGoodCount = useMemo(() => {
        return order.data?.goodToOrders?.length
    }, [order?.data]);

    const orderDiscount = useMemo(() => {
        return order?.data?.sellingPriceDiscount + order?.data?.shippingPriceDiscount
    }, [order?.data]);

    const breadCrumbs = useMemo(() => {

        return [
            {
                isActive : true,
                path : "/",
                title : t("Main")
            },
            {
                isActive : true,
                path : "/",
                title : t("My Orders")
            },
            {
                isActive : false,
                path : "/",
                title : t("Order No")
            },
        ]
    }, [t]);


    const statusTexts : {[key : number] : "created" | "collecting" | "on_way" | "completed"} = useMemo(() => {
        return {
            0 : "created",
            1 : "collecting",
            2 : "on_way",
            3 : "completed"
        }
    }, []);


    return <Grid container>
        <Grid xs={12} lg={9} xl={8}>
    <Stack spacing={7}>
        <Stack spacing={3}>
            <CustomBreadCrumb options={breadCrumbs}/>
            <Stack spacing={2}>
                <h1 className={'text-3xl-bold'}>{`${t('Order No')}${orderId}`}</h1>
                <span className={'text-base-light-gray'}>
                    {t('Order created at ')} {formatDateOrder(order?.data?.createdAt ? new Date(order.data.createdAt) : new Date())}

                </span>
            </Stack>
        </Stack>
        <Stack spacing={3}>
            <OrderProcessStatus status={statusTexts[order.data?.data?.status as number ?? 0]}/>
            <div className="w-full aspect-[736/360] rounded-2xl overflow-hidden border-[1px] border-b-gray-secondary">
                <YandexMap coords={orderCoords}/>
            </div>
            <div className="w-full flex space-x-4">
                <div className={"w-full rounded-2xl border border-gray-default px-6 py-4 flex justify-between cursor-pointer"}>
                    <div className="flex space-x-4">
                        <ChatIcon className={"fill-gray-secondary"}/>
                        <div className="text-base-bold">
                            {t("Chat")}
                        </div>
                    </div>
                    <RightChevron className={"fill-gray-secondary"}/>
                </div>
                <div className={"w-full rounded-2xl border border-gray-default px-6 py-4 flex justify-between cursor-pointer"}>
                    <div className="flex space-x-4">
                        <PhoneIcon className={"fill-gray-secondary"}/>
                        <div className="text-base-bold">
                            {t("Call")}
                        </div>
                    </div>
                    <RightChevron className={"fill-gray-secondary"}/>
                </div>
            </div>
        </Stack>
        <div className="flex flex-col space-y-3">
            <div className="text-3xl-bold">{t('Order content')}</div>
            <Stack spacing={0}>
                {order.data?.goodToOrders?.map((item : IGoodToOrder, index : number) => <ProductItem key={index} price={item.goodSellingPrice} count={item.count} name={item.goodName} photoPath={item.goodImagePath}/>)}
            </Stack>
            {orderGoodCount > 4  ? <div className="flex w-full justify-center space-x-4">
                <DownArrowIcon/>
                <div className="text-base-bold">
                    {t("Show more")}
                </div>
            </div> : null}
        </div>
        <Stack spacing={3}>
            <div className="text-3xl-bold">
                {t("Order details")}
            </div>
            <div className="flex space-x-6 w-full">
                <div className="flex flex-col space-y-0 w-full">
                    <div className="text-base-light">{t("Created At")}</div>
                    <div className="text-base-light-gray">{formatDateOrder(order?.data?.createdAt ? new Date(order.data.createdAt) : new Date())}</div>
                </div>
                <div className="flex flex-col space-y-0 w-full">
                    <div className="text-base-light">{t("Payment Type")}</div>
                    <div className="text-base-light-gray">{t(PaymentTypes[order?.data?.paymentType as number ?? 0])}</div>
                </div>
            </div>
            <div className="flex space-x-6 w-full">
                <div className="flex flex-col space-y-0 w-full">
                    <div className="text-base-light">{t("Dont Call")}</div>
                    <div className="text-base-light-gray">{order?.data?.dontCallWhenDelivered ? t("Don't call") : t("Call when delivered")}</div>
                </div>
                <div className="flex flex-col space-y-0 w-full">
                    <div className="text-base-light">{t("Comment")}</div>
                    <div className="text-base-light-gray">{order?.data?.comment ?? " - "}</div>
                </div>
            </div>
        </Stack>
        <Stack spacing={3}>
            <div className="text-3xl-bold">
                {t("Delivery details")}
            </div>
            <div className="flex space-x-6 w-full">
                <div className="flex flex-col space-y-0 w-full">
                    <div className="text-base-light">{t("Delivery Type")}</div>
                    <div className="text-base-light-gray">{order?.data?.isPickup ? t("Pickup") : t("Delivery")}</div>
                </div>
                {!order?.data?.isPickup && <div className="flex flex-col space-y-0 w-full">
                    <div className="text-base-light">{t("Courier")}</div>
                    <div
                        className="text-base-light-gray">{`${order?.data?.courier?.user?.firstName} ${order?.data?.courier?.user?.lastName} (${formatPhoneNumber(order?.data?.courier?.phoneNumber ?? "")})`}</div>
                </div>}
            </div>
        </Stack>

    </Stack>
        </Grid>
        <Grid xs={12} lg={3} xl={4}>
            <CartPriceInfoPanel goodCount={orderGoodCount}
                                totalGoodPrice={order?.data?.sellingPrice ?? 0}
                                discount={orderDiscount ?? 0}
                                deliveryPrice={order.data?.shippingPrice ?? 0}
                                totalPrice={order?.data?.totalPrice ?? 0}
                                handleClickCreateOrder={() => {}}
            />
        </Grid>
    </Grid>
}