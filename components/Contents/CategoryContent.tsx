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


interface ICategoryContent {
    title?: string;
    data :  ISubCategoriesByCategoryResponse;
}

export const CategoryContent : React.FC<ICategoryContent> = ({title, data}) => {

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
    useEffect(() => {
        setActiveTab(`category-${data?.categories[0]?.id}`);
    }, []);

    useEffect(() => {

    }, []);

    function handleIntersection(entries : any[], observer : any) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // The target element is in view
                const targetElement = entry.target;

                // Scroll to the target element
                targetElement.scrollIntoView({ behavior: "smooth" });

                // Unobserve the target element so it doesn't trigger again
                observer.unobserve(targetElement);
            }
        });
    }



    const handleScrollToElement = (id : string) => {
          const element = document.getElementById(id);
          element?.scrollIntoView({behavior: "smooth", block: "start", inline: "nearest"});
    };

    useEffect(() => {
        if(!!activeTab) handleScrollToElement(activeTab);
    },[activeTab]);


    const handleTabClick = useCallback((id : string) => {
        setActiveTab(id);
    }, [activeTab]);

    return <Stack spacing={7} className={"container"}>
        <Stack spacing={4}>
            <Stack spacing={3}>
                <CustomBreadCrumb options={breadCrumbOptions}/>
                <h1 className={"text-4xl-bold"}>{title}</h1>
            </Stack>
            <div className="flex w-full space-x-1 ">
                {data?.categories.slice(0, 5).map((item ) => {
                    return  <TabCategory id={item.id}
                                         isActive={activeTab === item.id}
                                         name={item.name}
                                         handleClick={() => handleTabClick(item.id)}
                                         all={item.id === null}/>;
                })}
            </div>
        </Stack>
        {data?.categories?.map((category ) => {
            return <GoodListWrapper id={`category-${category.id}`} title={category.nameRu} path={""}>
                {
                    category?.goods?.slice(0, 5)?.map((good ) => {
                        return <Product id={good.id}
                                        name={good.nameRu}
                                        photoPath={good.photoPath}
                                        price={good.sellingPrice}
                                        discountedPrice={good.sellingPrice * (1 - good.discount)}
                                        availableCount={good.count}
                                        discountPercent={good.discount}/>;
                    })
                }
            </GoodListWrapper>;
        })}

    </Stack>;
};