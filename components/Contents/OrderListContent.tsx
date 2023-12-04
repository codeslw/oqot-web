"use client"
import {Stack} from "@mui/material";
import {CustomBreadCrumb} from "@/components/Customs/CustomBreadCumb";
import {TabCategory} from "@/components/Customs/TabCategory";
import {useMemo, useState} from "react";
import {useTranslations} from "use-intl";
import Cube from "@/public/icons/cube.svg"
import Car from "@/public/icons/car.svg"
import CircleX from "@/public/icons/circle-x.svg"
import CircleTick from "@/public/icons/circle-tick.svg"
import Finish from "@/public/icons/finish.svg"
import InfiniteScroll from "react-infinite-scroller";
import {useInfiniteQuery} from "@tanstack/react-query";
import api from "@/api/api";
import {OrderCard} from "@/components/Puzzles/OrderCard";
import {formatDateOrder} from "@/utils/services";
import {isSameDay} from "date-fns";

export const OrderListContent = () => {

    const t = useTranslations("OrderList");

    const [activeStatus, setActiveStatus] = useState<number | null>(null);

    //queries
    const orders : any = useInfiniteQuery(["/order/last/paged"], async ({pageParam = 0}) => {
        return api.get("/order/client/last/paged", {
            params: {
                pageIndex: pageParam,
                pageSize: 10
            }
        })
    }, {
        getNextPageParam: (lastPage) => {
            console.log(lastPage, " log")
            return lastPage?.data?.pageIndex + 1 < lastPage?.data?.pageCount ? lastPage.data?.pageIndex + 1 : undefined;
        },
        onSuccess : (data) => {
            console.log(data, " infinite data")
        }
    })

    //memos
    const breadCrumbOptions = useMemo(() => {
            return [
                {
                    title : t("Main"),
                    path  : "/",
                    isActive : false,
                },
                {
                    title : t("Order"),
                    path  : "/order",
                    isActive : true,
                }
            ]
    }, []);
    const orderStatusTypes = useMemo(() => {
        return [
            {
                title : t("All"),
                code : null,
            },
            {
                title : t("Completed"),
                code : 3,
                icon : <Finish className={"fill-white"}/>,
                color : "#B3B700"
            },
            {
                title : t("Cancled by Admin"),
                code : 4,
                icon : <CircleX className={"fill-white"}/>,
                color : "#FF2C45"
            },
            {
                title : t("Canceled by Client"),
                code : 5,
                icon: <CircleX className={"fill-white"}/>,
                color : "#FF2C45"
            },
            {
                title : t("Collecting"),
                code : 1,
                icon: <Cube className={"fill-white"}/>,
                color : "#FF7A00"
            },
            {
                title : t("Delivering"),
                code : 2,
                icon : <Car className={"fill-white"}/>,
                color : "#FF7A00"
            },
            {
                title: t("Accepted"),
                code : 0,
                icon : <CircleTick className={"fill-white"}/>,
                color: "#CACCD6"
            }
        ]
    }, []);



    const handleTabClick = (e : any, code : number | null) => {
        setActiveStatus(code);
    }


    return <Stack spacing={0}>
        <Stack spacing={4}>
            <Stack spacing={3}>
                <CustomBreadCrumb options={breadCrumbOptions}/>
                <h1 className={"text-4xl-bold"}>{t("My Orders")}</h1>
            </Stack>
            <div id={"tab-category"} className="flex overflow-x-auto no-scrollbar space-x-1 mt-6 py-2 -mb-2 sticky top-[88px] z-50 bg-white">
    
                {orderStatusTypes.map((item ) => {
                    return  <TabCategory id={item.code}
                                                 key = {item.code}
                                                 isSubcategory
                                                 isActive={activeStatus === item.code}
                                                 name={item.title}
                                                 handleClick={(e) => handleTabClick(e,item.code)}
                                                 all={item.code === null}/>;
                })}
            </div>
        </Stack>
        <InfiniteScroll

            loadMore={() => orders.fetchNextPage()}
            hasMore={orders.hasNextPage}
            loader={<div className="loader" key={0}>Loading ...</div>}
        >
            <div className="flex flex-col space-y-5">
                {orders?.data?.pages.map((page : any) => page.data?.data?.map((order : any, idx : number, list : any) => {

                    if(!isSameDay(new Date(order?.createdAt), new Date(list[idx - 1]?.createdAt))){
                        return  <div className={"!mt-14 flex flex-col w-full space-y-6"}>
                            <div className="text-3xl-bold">
                                {formatDateOrder(new Date(order.createdAt))}
                            </div>
                            <OrderCard createdAt={formatDateOrder(new Date(order.createdAt))}
                                       id={order.id}
                                       statusIcon={orderStatusTypes[order.status].icon}
                                       statusTitle={orderStatusTypes[order.status]?.title as string}
                                       statusColor={orderStatusTypes[order.status]?.color as string}
                                       price={order.totalPrice}
                                       deliveryType={order.isPickup ? t("Pickup") : t("Delivery")}
                                       goodPhotoPaths={order.goodToOrders.map((item : any) => item.photoPath)}/>
                        </div>
                    }

                    return <OrderCard createdAt={formatDateOrder(new Date(order.createdAt))}
                                      id={order.id}
                                      statusIcon={orderStatusTypes[order.status].icon}
                                      statusTitle={orderStatusTypes[order.status]?.title as string}
                                      statusColor={orderStatusTypes[order.status]?.color as string}
                                      price={order.totalPrice}
                                      deliveryType={order.isPickup ? t("Pickup") : t("Delivery")}
                                      goodPhotoPaths={order.goodToOrders.map((item : any) => item.photoPath)}/>

                }) )}
            </div>

        </InfiniteScroll>

    </Stack>
}