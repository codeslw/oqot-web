"use client";
import {Grid, Link, Stack} from "@mui/material";
import {useTranslations} from "use-intl";
import BreadCrumbsIcon from "@/public/icons/right-chevron-mini.svg";
import TrashIcon from "@/public/icons/trashbin.svg";
import {useQueryApi} from "@/hooks/useQueryApi";
import {CartItem} from "@/components/Customs/CartItem";
import {FavoriteGood, Good, ICart, IFavoriteGoodResponse} from "@/types/common";
import {observer} from "mobx-react-lite";
import cartStore, {ICartState} from "@/utils/stores/CartStore";
import {useToggle} from "@/hooks/useToggle";
import {ConfirmModal} from "@/components/Shared/ConfirmModal";
import {useMutationApi} from "@/hooks/useMutationApi";
import {CART_DELETE_ALL_URL, FAVORITE_URL} from "@/utils/constants";
import {CartPriceInfoPanel} from "@/components/Puzzles/CartPriceInfoPanel";
import {useMemo} from "react";
import {ca} from "date-fns/locale";
import {Empty} from "@/components/Shared/Empty";
import {useRouter} from "next/navigation";
import {CartItemsSkeleton} from "@/components/Skeletons/CartItemsSkeleton";
import {useSynchronizeCart} from "@/hooks/useSynchronizeCart";
import {AxiosResponse} from "axios";
import {Product} from "@/components/Customs/Product";
import {ProductsHeader} from "@/components/Shared/ProductsHeader";
export const CartCotnent = observer(() => {
    const t = useTranslations("Cart");
    const {open, onOpen, onClose} = useToggle();
    const deleteAllCart = useMutationApi(CART_DELETE_ALL_URL, "delete", {});
    const deliveryPrice = 0;
    const router = useRouter()
    const {cartItems} = useSynchronizeCart()

    const favourites = useQueryApi<AxiosResponse<IFavoriteGoodResponse>>(FAVORITE_URL, {}, {})

    const onConfirmDeleteAll = async () => {
        try {
         const response = await deleteAllCart.mutateAsync({});
         if (response.status < 400) {
             cartStore.setCart([]);
             cartItems.refetch();
             onClose();
         }
        }
        catch (e) {
            console.log(e);
        }
    };

    const handleEmptyButtonClicked = () => {
        router.push("/");
    }

    const onCancelDeleteAll = () => {
        onClose();
    };
    const showConfirmModal = () => {
        onOpen();
    };


    const totalDiscountPrice = useMemo(() => {
        return cartStore.cart?.reduce((acc : number, item : ICartState) => {
            return acc + (item.goodPrice * item.goodDiscount);
        }, 0);
    }, [cartStore.cart]);

    const totalGoodPrice = useMemo(() => {
        return cartStore.cart?.reduce((acc : number, item : ICartState) => {
            return acc + item.goodPrice * item.count;
        },0);
    }, [cartStore.cart]);

    const totalPrice = useMemo(() => {
        return totalGoodPrice - totalDiscountPrice + deliveryPrice;
    }, [cartStore.cart, totalGoodPrice, totalDiscountPrice]);

    const totalGoodCount = useMemo(() => {
        return cartStore.cart?.reduce((acc : number, item : ICartState) => {
            return acc + item.count;
        },0);
    }, [cartStore.cart]);



    return <>
        <Grid container>
        <Grid xs={12} lg={9} xl={8}>
           <Stack spacing={4} width={"95%"}>
            <Stack spacing={3}>
              <div className="flex items-center space-x-2 cursor-pointer">
                  <div className="text-base-light">{t("Main")}</div>
                  <BreadCrumbsIcon/>
                  <div className="text-base-light">{t("Cart")}</div>
              </div>
               <div className="flex w-full space-x-6 items-center justify-between">
                   <div className="text-3xl-bold">
                       {t("Cart")}
                   </div>
                   {cartStore.cart.length > 0 && <div onClick={showConfirmModal}
                         className="flex space-x-2 items-center cursor-pointer rounded-lg p-1 hover:bg-gray-background">
                       <TrashIcon className={"fill-gray-secondary hover:fill-red-default"}/>
                       <div className="text-base-bold-gray">
                           {t("Clear cart")}
                       </div>
                   </div>}
               </div>
            </Stack>
               {(!cartItems.isLoading && cartStore.cart.length === 0) ? null : <Stack spacing={0}>
                   {cartItems.isLoading ? <CartItemsSkeleton/>
                       : cartStore.cart?.map((item: ICartState) => <CartItem
                           name={item.goodName}
                           price={item.goodPrice}
                           id={item.goodId}
                           discount={item.goodDiscount}
                           photoPath={item.goodPhotoPath}
                           goodId={item.goodId}
                           count={item.count}
                           maxCount={item.maxCount}
                       />)
                   }

               </Stack>}
           </Stack>
        </Grid>
        {cartStore.cart.length > 0 && <Grid xs={12} lg={3} xl={4}>
            <CartPriceInfoPanel goodCount={totalGoodCount}
                                totalGoodPrice={totalGoodPrice}
                                discount={totalDiscountPrice}
                                deliveryPrice={deliveryPrice}
                                totalPrice={totalPrice}/>
        </Grid>}
        <ConfirmModal
            open={open}
            onClose={onClose}
            confirmLoading = {deleteAllCart.isLoading}
            title={t("Clear all?")}
            message={t("DeleteAllConfirmation_text")}
            onConfirm={onConfirmDeleteAll}
            onCancel={onCancelDeleteAll}
            confirmText={t("Delete")}
            cancelText={t("Cancel")}
        />
    </Grid>
    {cartStore.cart.length === 0 && !cartItems.isLoading ? <Empty title={t("Cart is empty now")}
                                                                  message={t("Cart empty_text")}
                                                                  buttonText={t("Go to purchases")}
                                                                  onButtonClicked={handleEmptyButtonClicked}
    /> : null}

        {favourites.isLoading ? <div>Loading...</div> : favourites.data?.data?.favoriteGoods.length === 0 ? null

            : <Stack spacing={3} width={"100%"}>
                <ProductsHeader title={t("Favourites")} link={"/favourites"}/>
            <div className={"grid grid-cols-3 sm:grid-cols-4 xl:grid-cols-5 gap-2 md:gap-3 lg:gap-4 xl:gap-5 mt-6"}>{
            favourites.data?.data?.favoriteGoods.map(({good}: FavoriteGood) => (

                <Product
                         key={good.id}
                         id={good.id}
                         name={good.nameRu}
                         photoPath={good.photoPath}
                         price={good.sellingPrice}
                         discountedPrice={(1 - good.discount) * good.sellingPrice}
                         availableCount={good.count}
                         discountPercent={good.discount}/>
                    )
                    )}</div>
                </Stack>

        }

</>
});