"use client";
import {Modal} from "@/components/Modal";
import {CircularProgress, Grid, Stack} from "@mui/material";
import Image from "next/image";
import {useQueryApi} from "@/hooks/useQueryApi";
import {AxiosResponse} from "axios";
import {IGood, IRecommended} from "@/types/Goods";

import React, {useEffect, useMemo, useState} from "react";
import {useTranslations} from "use-intl";
import {CustomBreadCrumb} from "@/components/Customs/CustomBreadCumb";
import {formatPrice} from "@/utils/services";
import {Button} from "@/components/Button";


import HeartIcon from "@/public/icons/heart.svg";
import HeartFilledIcon from "@/public/icons/heart-filled.svg";
import AttentionIcon from "@/public/icons/circle-attention.svg";
import RightChervonIcon from "@/public/icons/right-chevron.svg";
import {ProductContentSkeleton} from "@/components/Skeletons/ProductContentSkeleton";
import {GET_GOOD_BY_CATEGORY} from "@/utils/constants";
import {Product} from "@/components/Customs/Product";
import Link from "next/link";
import {AnimatePresence, motion} from "framer-motion";
import {useSynchronizeCart} from "@/hooks/useSynchronizeCart";
import {AnimateModalContentWrapper} from "@/components/Wrappers/AnimateModalContentWrapper";
import {observer} from "mobx-react-lite";
import cartStore from "@/utils/stores/CartStore";
import PlusIcon from "@/public/icons/plus.svg"
import MinusIcon from "@/public/icons/minus.svg"
import favouriteStore from "@/utils/stores/FavouriteStore";


interface IProductContent {
    open : boolean,
    onClose : () => void
    goodId : string,
}



export const ProductContent : React.FC<IProductContent> = observer(({open, onClose, goodId}) => {

    const [favourite, setFavourite] = useState(false);
    const t = useTranslations("Product");

    const [innerCount, setInnerCount] = useState(cartStore?.cart?.find((item) => item.goodId === goodId)?.count);


    useEffect(() => {
        setInnerCount(cartStore?.cart?.find((item) => item.goodId === goodId)?.count ?? 0)
    }, [goodId]);

    const good = useQueryApi<IGood, any, IGood>(`/good/${goodId}`, {}, {
        enabled : !!goodId,
        onSuccess : (data : IGood) => {
            console.log(data)
        },
         select : (data) => data.data
    });

    const recommendeds = useQueryApi<IRecommended, any, IRecommended>(`${GET_GOOD_BY_CATEGORY}/${good?.data?.categories?.[1]?.id}`,
        {},
        {
            enabled : !!(good?.data?.categories?.[1]?.id),
            select : (data) => data.data
        })

    const breadCumbOptions = useMemo(() => {
        return [
            {
                title : good?.data?.categories[good?.data?.categories?.length - 1]?.nameRu ?? t("Category"),
                path : `/category/${good?.data?.categories[good?.data?.categories?.length - 1]?.id}`,
                isActive : false
            },
            {
                title : good?.data?.categories[0]?.nameRu ?? t("Category"),
                path : `/category/${good?.data?.categories[good?.data?.categories?.length - 1]?.id}?childId=${good?.data?.categories[0]?.id}`,
                isActive : false
            },
            {
                title : good?.data?.nameRu ?? "",
                path : `/`,
                isActive : true
            },
        ]
    }, [good?.data]);

    const countInCart = useMemo(() => {
        const found =  cartStore.cart?.find(item => item.goodId === good?.data?.id)?.count;
        console.log(found, cartStore.cart," found")
        return found
    }, [cartStore.cart, good?.data]);


    console.log(countInCart, " count");


    const handleIncrement = () => {
        if(innerCount! < good?.data?.count!) {
            setInnerCount(prev => prev! + 1);
        }
    }

    const handleDecrement = () => {
        if(innerCount! > 0) {
            setInnerCount(prev => prev! - 1);
        }
    }


    useEffect(() => {

        const timer  = setTimeout( () => {
            if(innerCount !== undefined && cartStore?.cart.find((item) => item.goodId === good?.data?.id)?.count !== innerCount){
                cartStore.updateGoodCountInCart(goodId, innerCount)
            }

        }, 800)

        return () => {
            clearInterval(timer)
        }

    }, [innerCount]);


    useEffect(() => {
        console.log(cartStore.cart, " cartStore")
    }, [cartStore.cart]);

    const handleAddToCart = () => {
        cartStore.addToCart({
            id : "",
            goodId: good?.data?.id!,
            goodName: good?.data?.name!,
            goodPhotoPath: good?.data?.photoPath!,
            goodPrice: good?.data?.sellingPrice!,
            goodDiscount: good?.data?.discount!,
            count: 1,
            maxCount: good?.data?.count!
        });
        setInnerCount(prevState => (prevState ?? 0) + 1)

    }

    const handleLikeClick = (e : React.MouseEvent<HTMLDivElement>) => {
        e.stopPropagation()
        if(favouriteStore.favouriteGoods.includes(goodId)) {
            favouriteStore.removeFromFavouriteGoods(goodId);
        }
        else  {
            favouriteStore.addToFavouriteGoods(goodId)
        }
    }



    return<Modal open={open} onCloseIconClicked={onClose} extraClassName={'p-10 max-w-[1000px] w-[1000px] min-w-[1000px] max-h-[900px] min-h-[900px] overflow-y-auto no-scrollbar overflow-x-hidden'}>
            <AnimateModalContentWrapper>
            {good.isLoading ? <div className={"w-full h-full flex-center"}>
                <CircularProgress/>
            </div> : <Stack direction={"column"} spacing={1}>
            <Grid container>
                <Grid item xs={12} md={6} lg={4}>
                    <div className={"w-[320px] h-[320px] relative p-2"}>
                        <Image src={good?.data?.photoPath!} alt={""} fill/>
                        <div className="absolute top-1 flex justify-between items-center !z-50 w-full px-4">
                            {good.data?.discount ? <div
                                className="w-16 h-7 rounded-2xl flex-center text-base-bold text-white bg-orange-default">
                                {`-${good.data?.discount ? parseInt((good.data.discount * 100).toString()) : 0}%`}
                            </div> : <div></div>}
                            <div
                                onClick={handleLikeClick}
                                className={"cursor-pointer"}>
                                {favouriteStore.favouriteGoods.includes(goodId) ? <HeartFilledIcon className={"fill-red-default"}/> : <HeartIcon className={"fill-gray-secondary hover:fill-red-default"}/>}
                            </div>
                        </div>
                    </div>
                </Grid>
                <Grid item xs={12} md={6} lg={8} className={"flex justify-end"}>
                    <Stack direction={"column"} spacing={3} width={"90%"}>
                        <div className="flex space-y-5 flex-col">
                            <div className="flex space-y-3 flex-col">
                                <CustomBreadCrumb options={breadCumbOptions} inModal/>
                                <h1 className="text-3xl-bold dark:text-black-primary">
                                    {good?.data?.nameRu ?? ""}
                                </h1>
                            </div>
                            <div
                                className="w-max rounded-2xl bg-green-background text-base-bold text-white flex-center px-3 py-0.5">
                                {good?.data?.categories[0]?.nameRu ?? ""}
                            </div>
                        </div>
                        <div className="flex space-x-3 items-end">
                            <div className={`text-2xl-bold dark:text-black-primary ${good?.data?.discount ? "text-orange-default" : ""}`}>
                                {`${formatPrice(good?.data?.sellingPrice! * (1 - good?.data?.discount!))} ${t("sum")}`}
                            </div>
                            {good?.data?.discount ? <div
                                className="text-base-bold-gray line-through">{good?.data?.sellingPrice}</div> : null}
                        </div>
                        <div className="w-1/2">
                            {!innerCount ?
                            <Button
                                onClick={handleAddToCart}
                                text={t("Add to Cart")} theme={"primary"}/>
                                : <Button theme={"primary"}
                                          text={`${innerCount}`}
                                          textClasses={"w-[132px]"}
                                          startIcon={<MinusIcon
                                          onClick={handleDecrement}
                                          />}
                                          endIcon={<PlusIcon
                                              onClick={handleIncrement}
                                              className = "fill-black-primary"/>}
                                />}
                        </div>
                        <div className="flex flex-col space-y-2">
                            <div className="text-base-light-gray">
                                {t("Contains")}
                            </div>
                            <p className={"text-base-light dark:text-black-primary"}>
                                {good?.data?.descriptionRu ?? ""}
                            </p>
                        </div>
                        <div className="text-base-light dark:text-black-primary">
                            {good?.data?.unitRu ?? ""}
                        </div>
                        {good?.data?.noteRu ? <div className="p-4 bg-red-background flex space-x-3 max-w-[70%]">
                            <AttentionIcon/>
                            <p>
                                {good?.data?.noteRu ?? ""}
                            </p>
                        </div> : null}
                    </Stack>
                </Grid>
            </Grid>
            <Stack direction={"column"} spacing={3}>
                <div className="w-full flex justify-between">
                    <h2 className="text-3xl-bold">
                        {t("You may need")}
                    </h2>
                    <Link href={`/category/${good?.data?.categories?.[good?.data?.categories?.length - 1]?.id}`}  className="text-base-bold-gray flex items-center space-x-2 cursor-pointer">
                        <div>
                            {t("More")}
                        </div>
                        <RightChervonIcon className={"fill-gray-secondary "}/>
                    </Link>
                </div>
                <div className={"grid grid-cols-3 sm:grid-cols-3 xl:grid-cols-4 gap-2 md:gap-3 lg:gap-4 xl:gap-5 mt-6"}>
                    {recommendeds.data?.goods?.slice(0, 4)?.map((item) => {
                        return <Product id={item.id}
                                        name={item.nameRu}
                                        photoPath={item.photoPath}
                                        price={item.sellingPrice}
                                        discountedPrice={item.sellingPrice * (1 - item.discount)}
                                        availableCount={item.count}
                                        lightBackground
                                        discountPercent={item.discount}/>
                    })}
                </div>
            </Stack>
        </Stack>}
            </AnimateModalContentWrapper>
    </Modal>
    ;

});