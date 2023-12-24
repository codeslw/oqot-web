"use client";
import {Stack} from "@mui/material";
import {CustomBreadCrumb} from "@/components/Customs/CustomBreadCumb";
import {useTranslations} from "use-intl";
import {useCallback, useEffect, useMemo, useState} from "react";
import {IFavouriteGood, ISubCategoriesByCategoryResponse} from "@/types/Goods";
import {ICategory} from "@/types/common";
import {TabCategory} from "@/components/Customs/TabCategory";
import {GoodListWrapper} from "@/components/Wrappers/GoodListWrapper";
import {Product} from "@/components/Customs/Product";
import {element} from "prop-types";
import {useMutationApi} from "@/hooks/useMutationApi";
import {FAVORITE_URL, FOOTER_HEIGHT, HEADER_HEIGHT} from "@/utils/constants";
import {useQueryApi} from "@/hooks/useQueryApi";
import {Empty} from "@/components/Shared/Empty";
import {useQueryClient} from "@tanstack/react-query";


interface ICategoryContent {
    title?: string;
}

export const FavoritesContent : React.FC<ICategoryContent> = ({title}) => {

    const t = useTranslations("Favourites");
    const [activeTab, setActiveTab] = useState<string | null>(null);
    const queryClient = useQueryClient()
    const breadCrumbOptions = useMemo(() => {
        return [
            {
                title : t("Main"),
                path  : "/",
                isActive : false,
            },
            {
                title : t("Favourites") ?? "",
                path  : "",
                isActive : true,
            }
        ];
    }, [t]);


    const favorites = useQueryApi(FAVORITE_URL,{}, {
        onSuccess : (data) => {
        }
    });





    return <Stack spacing={7}
                  style={{
                      minHeight :`calc(100vh - ${(HEADER_HEIGHT + FOOTER_HEIGHT)}px)`
                  }}
                  className={`container`}>
        <Stack spacing={4}>
            <Stack spacing={3}>
                <CustomBreadCrumb options={breadCrumbOptions}/>
                <h1 className={"text-4xl-bold"}>{t("Favourites")}</h1>
            </Stack>
        </Stack>

        {favorites?.data?.data?.favoriteGoods?.length === 0 ? <Empty title={t("No Favorites found")} message={t("There are no favorites")}/> :  <GoodListWrapper key={title} path={""}>
            {
                favorites?.data?.data?.favoriteGoods?.map(({good}: IFavouriteGood) => {
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
        </GoodListWrapper>}


    </Stack>;
};