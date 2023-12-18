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
import {usePathname, useRouter, useSearchParams} from "next/navigation";
import {useQueryParams} from "@/hooks/useQueryParams";


interface ICategoryContent {
    title?: string;
    data :  ISubCategoriesByCategoryResponse;
}

export const CategoryContent : React.FC<ICategoryContent> = ({title, data}) => {

    const t = useTranslations("Category");
  //  const [activeTab, setActiveTab] = useState<string | null>(null);
    const router = useRouter()
    const searchParams = useSearchParams();
    const pathname = usePathname()
    const {createQueryString} = useQueryParams()

    // useEffect(() => {
    //     const childId = searchParams.get('childId');
    //     if(childId) {
    //     //    setActiveTab(`category-${childId}`)
    //     }
    // }, [searchParams]);


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
        const childId = searchParams.get('childId');
        if(data?.categories?.length  > 0 && !childId) {
            //setActiveTab(`category-${data?.categories[0]?.id}`);
           router.push(pathname + '?' + createQueryString('childId', data?.categories[0]?.id), {scroll : false})
        }
    }, [data?.categories]);

    useEffect(() => {
        const childId = searchParams.get('childId');
        if(childId) {
            handleScrollToElement(childId);
            console.log(childId, "changed")
        }

        },[searchParams.get("childId")])



    useEffect(() => {

        const elements = document.querySelectorAll('[id^="category-"]');
        console.log(elements, " elements");
        const timeouts: { [key: string] : any } = [];

        const observer = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    console.log("intersecting")
                   timeouts[entry.target.id] = setTimeout(() => {
                     //  setActiveTab(entry.target.id);
                       router.push(pathname + '?' + createQueryString('childId', entry.target.id.slice(9, 1000)), {
                           scroll : false
                       })

                   },700)
                }
                else if (!entry.isIntersecting) {
                    clearTimeout(timeouts[entry.target.id]);
                }
                // observer.unobserve(entry.target);
            });
        }, {
            root: null,
            rootMargin: "0px",
            threshold: 1,
        });

        elements.forEach((element) => {
            observer.observe(element);
        });


    }, []);



    const handleScrollToElement = (id : string) => {
          const element = document.getElementById(`category-${id}`);
          element?.scrollIntoView({behavior : "smooth", block: "center", inline: "start"});
    };


    //@ts-ignore
    const handleTabClick = (e : MouseEvent<HTMLAnchorElement, MouseEvent> ,id : string) => {
        e.preventDefault();
        //setActiveTab(`category-${id}`);
        router.push(pathname + '?' + createQueryString('childId' , id), {scroll : false})
        handleScrollToElement(`category-${id}`);
    }

    return <Stack spacing={7} className={"container"}>
        <Stack spacing={4} className={"!block"}>
            <Stack spacing={3}>
                <CustomBreadCrumb options={breadCrumbOptions}/>
                <h1 className={"text-4xl-bold"}>{title}</h1>
            </Stack>

        </Stack>
        <div id={"tab-category"} className="flex w-full space-x-1 mt-6 py-2 -mb-2 sticky top-[88px] z-50 bg-white overflow-auto no-scrollbar">
            {data?.categories?.map((item ) => {
                return  <TabCategory id={item.id}
                                     key = {item.id}
                                     isSubcategory
                                     //isActive={activeTab === `category-${item.id}`}
                                     isActive={searchParams.get('childId') === item.id}
                                     name={item.name}
                                     handleClick={(e) => handleTabClick(e,item.id)}
                                     all={item.id === null}/>;
            })}
        </div>


        {data?.categories?.map((category ) => {
            return <GoodListWrapper key={category.id} id={`category-${category.id}`} title={category.nameRu} path={""}>
                {
                    category?.goods?.slice(0, 5)?.map((good ) => {
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
            </GoodListWrapper>;
        })}

    </Stack>;
};