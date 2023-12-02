"use client"
import {Stack} from "@mui/material";
import {CustomBreadCrumb} from "@/components/Customs/CustomBreadCumb";
import {TabCategory} from "@/components/Customs/TabCategory";
import {useMemo, useState} from "react";
import {useTranslations} from "use-intl";

export const OrderListContent = () => {

    const t = useTranslations("OrderList");

    const [activeStatus, setActiveStatus] = useState<number | null>(null);

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


    const orderTypes = useMemo(() => {
        return [
            {
                title : t("All"),
                code : null,
            },
            {
                title : t("Completed"),
                code : 3,
            },
            {
                title : t("Cancled by Admin"),
                code : 4,
            },
            {
                title : t("Canceled by Client"),
                code : 5,
            },
            {
                title : t("Collecting"),
                code : 1,
            },
            {
                title : t("Delivering"),
                code : 2,
            },
            {
                title: t("Accepted"),
                code : 0
            }
        ]
    }, []);


    const handleTabClick = (e : any, code : number | null) => {
        setActiveStatus(code);
    }


    return <Stack spacing={7}>
        <Stack spacing={4}>
            <Stack spacing={3}>
                <CustomBreadCrumb options={breadCrumbOptions}/>
                <h1 className={"text-4xl-bold"}>{t("My Orders")}</h1>
            </Stack>
            <div id={"tab-category"} className="flex w-full space-x-1 mt-6 py-2 -mb-2 sticky top-[88px] z-50 bg-white">
    
                {orderTypes.map((item ) => {
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

    </Stack>
}