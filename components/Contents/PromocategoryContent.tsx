"use client";
import {Stack} from "@mui/material";
import {CustomBreadCrumb} from "@/components/Customs/CustomBreadCumb";
import {useTranslations} from "use-intl";
import {useCallback, useEffect, useMemo, useState} from "react";
import {ISubCategoriesByCategoryResponse} from "@/types/Goods";
import {ICategory} from "@/types/common";
import {TabCategory} from "@/components/Customs/TabCategory";
import {GoodListWrapper} from "@/components/Wrappers/GoodListWrapper";
import {Product} from "@/components/Customs/Product";
import {element} from "prop-types";


interface ICategoryContent {
    title?: string;
    data :  any;
}

export const PromocategoryContent : React.FC<ICategoryContent> = ({title, data}) => {

    const t = useTranslations("Category");
    const [activeTab, setActiveTab] = useState<string | null>(null);

    const breadCrumbOptions = useMemo(() => {
        return [
            {
                title : t("Main"),
                path  : "/",
                isActive : false,
            },
            {
                title : title ?? "",
                path  : "",
                isActive : true,
            }
        ];
    }, [t]);






    return <Stack spacing={7} className={"container"}>
        <Stack spacing={4}>
            <Stack spacing={3}>
                <CustomBreadCrumb options={breadCrumbOptions}/>
                <h1 className={"text-4xl-bold"}>{title}</h1>
            </Stack>
        </Stack>

             <GoodListWrapper key={title}  path={""}>
                {
                    data?.data?.map((good :any) => {
                        return <Product id={good.id}
                                        name={good.nameRu}
                                        key={good.id}
                                        photoPath={good.photoPath}
                                        price={good.sellingPrice}
                                        discountedPrice={good.sellingPrice * (1 - good.discount)}
                                        availableCount={good.count}
                                        discountPercent={good.discount}/>;
                    })
                }
            </GoodListWrapper>


    </Stack>;
};