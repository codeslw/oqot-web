"use client";
import {
    Alert,
    AlertColor,
    FormControl,
    FormGroup,
    FormLabel,
    Grid,
    IconButton, Slide,
    Snackbar,
    Stack,
    Switch
} from "@mui/material";
import BreadCrumbsIcon from "@/public/icons/right-chevron-mini.svg";
import cartStore, {ICartState} from "@/utils/stores/CartStore";
import TrashIcon from "@/public/icons/trashbin.svg";
import {CartItemsSkeleton} from "@/components/Skeletons/CartItemsSkeleton";
import {CartItem} from "@/components/Customs/CartItem";
import {CartPriceInfoPanel} from "@/components/Puzzles/CartPriceInfoPanel";
import {useEffect, useMemo, useState} from "react";
import {useTranslations} from "use-intl";
import RightChevron from "@/public/icons/right-chevron.svg";
import ChatIcon from "@/public/icons/chat.svg";
import PhoneIcon from "@/public/icons/phone.svg";
import {CustomSwitch} from "@/components/Customs/CustomSwitch";
import {Input} from "@/components/Input";
import {Controller, useForm} from "react-hook-form";
import {fi} from "date-fns/locale";
import {DatePicker} from "@mui/x-date-pickers";
import {CustomDatePicker} from "@/components/Customs/CustomDatePicker";
import {CustomTimePicker} from "@/components/Customs/CustomTimePicker";
import {Button} from "@/components/Button";
import {AddressListModalContent} from "@/components/Puzzles/AddressListModalContent";
import {observer} from "mobx-react-lite";
import AddressStore from "@/utils/stores/AddressStore";
import {getAddressDetailsText} from "@/utils/services";
import {useMutationApi, useMutationApiAdvanced} from "@/hooks/useMutationApi";
import api from "@/api/api";
import {Modal} from "@/components/Modal";
import {AddCard} from "@/components/Puzzles/PaymentMethodsContentModal/AddCard";
import {PaymentMethodsContentModal} from "@/components/Puzzles/PaymentMethodsContentModal/PaymentMethodsContentModal";
import {usePayment} from "@/hooks/usePayment";
import {PaymentMethodCardContent} from "@/components/Puzzles/PaymentMethodCardContent";
import PaymentStore from "@/utils/stores/PaymentStore";
import UIStore from "@/utils/stores/UIStore";
import {AddressModalContent} from "@/components/Puzzles/AddressModalContent";
import {AnimateModalContentWrapper} from "@/components/Wrappers/AnimateModalContentWrapper";
import {ICalculatePricePayload, ICalculatePriceResponse, ICreateOrder} from "@/types/Order";
import {format} from "date-fns";
import CartStore from "@/utils/stores/CartStore";
import {useCart} from "@/hooks/useCart";
import {useRouter} from "next/navigation";


export const CreateOrderContent = observer(() => {

    const t = useTranslations("CreateOrder");
    const deliveryPrice = 0;
    const {control, handleSubmit, watch, setError} = useForm();
    const [openAddressList, setOpenAddressList] = useState(false);
    const [promoStatus, setPromoStatus] = useState("");
    const [promoMessage, setPromoMessage] = useState("");
    const [openPaymentMethods, setOpenPaymentMethods] = useState(false);
    const [deliverySoon, setDeliverySoon] = useState(false);
    const [calculatedTotalPrice, setCalculatedTotalPrice] = useState<null | number>(null);
    const [calculatedTotalDiscount, setCalculatedTotalDiscount] = useState<null | number>(null);
    const [calculatedTotalGoodPrice, setCalculatedTotalGoodPrice] = useState<null | number>(null);
    const [calculatedTotalGoodCount, setCalculatedTotalGoodCount] = useState<null | number>(null);
    const [calculatedTotalShippingPrice, setCalculatedTotalShippingPrice] = useState<null | number>(null);
    const router = useRouter();
    const [toast, setToast] = useState<{
        message: string,
        open: boolean,
        status : AlertColor
    } | null>()
    //mutations
    const calculatePrice = useMutationApi<ICalculatePriceResponse, ICalculatePricePayload>('/order/calculateprice', "post", {});
    const checkpromo = useMutationApiAdvanced('promo/checkpromo', "get", {});
    const createOrder = useMutationApi<string, ICreateOrder>('/order', "post", {});

    //watch
    const promocode = watch("promocode");


    //actions
    const {clearCart} = useCart()




    const addressDetails = useMemo(() => {
        return [
            {
                name : "appartment",
                label : t("Appartment"),
                type : "text",
                placeholder : t("App/Office"),
            },
            {
                name : "entrance",
                label : t("Entrance"),
                type : "number",
                placeholder : t("Entrance"),
            },
            {
                name : "floor",
                label : t("Floor"),
                type : "number",
                placeholder : t("Floor"),
            },
            {
                name : "domophone",
                label : t("Domophone"),
                type : "number",
                placeholder : t("Domophone"),
            },
        ];
    }, []);



    const totalDiscountPrice = useMemo(() => {
        return calculatedTotalDiscount ??  cartStore.cart?.reduce((acc : number, item : ICartState) => {
            return acc + (item.goodPrice * item.goodDiscount);
        }, 0);
    }, [cartStore.cart, calculatedTotalDiscount]);

    const totalGoodPrice = useMemo(() => {
        return calculatedTotalGoodPrice ?? cartStore.cart?.reduce((acc : number, item : ICartState) => {
            return acc + item.goodPrice * item.count;
        },0);
    }, [cartStore.cart, calculatedTotalGoodPrice]);

    const totalPrice = useMemo(() => {
        return calculatedTotalGoodPrice ?? (totalGoodPrice - totalDiscountPrice + deliveryPrice);
    }, [cartStore.cart, totalGoodPrice, totalDiscountPrice, calculatedTotalPrice]);

    const totalGoodCount = useMemo(() => {
        return cartStore.cart?.reduce((acc : number, item : ICartState) => {
            return acc + item.count;
        },0);
    }, [cartStore.cart]);


    const handleClosePaymentMethodsModal = () => {
        if(PaymentStore.paymentMethod === 2 && !PaymentStore.paymentCardId) {
            PaymentStore.setPaymentMethod(null)
        }
        setOpenPaymentMethods(false)
        UIStore.setActivePaymentStage("list");
    }

    const handleApplyPromocode = async () => {
        if(promocode) {
            try {
                const response : any = await checkpromo.mutateAsync({
                    slug : `/${promocode}`
                });
                if(response.status < 400 && response.data?.success) {
                    setPromoStatus("success");
                    handleCalculatePrice()
                }
                else if (!response.data.success) {
                    setPromoStatus("error");
                    setPromoMessage(response.data.message);
                }
            }
            catch (e) {
                setPromoStatus("error");
            }
        }
    }


    const handleCalculatePrice = async () => {

            try {
                const response = await calculatePrice.mutateAsync({
                    toLatitude : AddressStore.activeAddress?.latitude ?? 0,
                    toLongitude : AddressStore.activeAddress?.longitude ?? 0,
                    goodToOrders : cartStore?.cart?.map(item => ({
                        goodId : item.goodId,
                        count : item.count
                    })),
                    promo : promocode ?? "",
                    isPickup : AddressStore.activeAddress?.addressType === 0  ? true : false,

                });

                if (response.status < 400) {
                    setCalculatedTotalPrice(response.data.totalPrice);
                    setCalculatedTotalGoodPrice(response.data.sellingPrice);
                    setCalculatedTotalDiscount(response.data.sellingPriceDiscount + response.data.shippingPriceDiscount);
                    setCalculatedTotalShippingPrice(response.data.shippingPrice);
                }

            }
            catch (e) {

            }

    }

    const handleOpenAddressList = () => {
        setOpenAddressList(true)
    }

    const handleCloseToast = () => {
        setToast(null)
    }

    const handleCreateOrder = () => {
        handleSubmit(async (data) => {
            console.log(data, " data to submit");
            const date = data.date ? format(data.date, "YYYY-MM-DD") : null;
            const time  = data.time ?  format(data.time, "HH:mm:ss.SSS") : null;
            const formatedDate = `${date}T${time}Z`
            try {
                const response = await createOrder.mutateAsync({

                    "comment": data.comment ?? "",
                    "dontCallWhenDelivered": AddressStore.dontCall ?? true,
                    "apartment": data.apartment ?? "",
                    "floor": data.floor ?? "",
                    "entrance": data.entrance,
                    "address": AddressStore.activeAddress?.address ?? "",
                    "toLongitude": AddressStore.activeAddress?.longitude ?? 0,
                    "toLatitude": AddressStore.activeAddress?.latitude ?? 0,
                    "isPickup": AddressStore.activeAddress?.addressType === 0 ? true : false,
                    "paymentType": PaymentStore.paymentMethod ?? 0,
                    "promo": data.promocode ?? "",
                    "deliverAt": deliverySoon ? null : formatedDate,
                    "goodToOrders": CartStore.cart.map(item => ({
                        goodId : item.goodId,
                        count : item.count
                    }))

                })

                if(response.status < 400) {
                    clearCart()
                    setToast({
                        message : t("OrderCreated"),
                        open : true,
                        status : "success"
                    })
                    router.push(`/order/${response.data}`)

                }
            }
            catch (e) {

            }

        })()
    }


    return  <Grid container>
        <Grid xs={12} lg={8} xl={8}>
           <Stack spacing={7}>
               <Stack spacing={3}>
                   <div className="flex items-center space-x-2">
                       <div className="text-base-light">{t("Main")}</div>
                       <BreadCrumbsIcon/>
                       <div className="text-base-light">{t("Create order")}</div>
                   </div>
                   <div className="flex w-full space-x-6 items-center justify-between">
                       <div className="text-3xl-bold">
                           {t("Create order")}
                       </div>
                   </div>
               </Stack>
               <Stack spacing={3}>
                   <div className="text-3xl-bold">{t("Delivery address")}</div>
                   <div
                       onClick={() => setOpenAddressList(!openAddressList)}
                       className="w-full p-4 rounded-2xl bg-gray-background flex justify-between items-center cursor-pointer">
                       <Stack spacing={0}>
                           <div className="text-base-bold">
                               {AddressStore.activeAddress?.address ?? t("Choose address")}
                           </div>
                           <div className="text-xs-light-gray">
                               {getAddressDetailsText(AddressStore.activeAddress, t)}
                           </div>
                       </Stack>
                       <RightChevron className={"fill-gray-secondary"} />
                   </div>
                   <div className="flex items-center space-x-4">
                        <CustomSwitch onChange={(e ) => {
                            if(e.target.checked) {
                                AddressStore.setPrivateHome(true);
                            }
                            else {
                                AddressStore.setPrivateHome(false);
                            }
                        }}/>
                       <div className="text-base-bold">
                           {t("Private home")}
                       </div>
                   </div>
                   {!AddressStore.isPrivateHome &&  <Grid container>
                       {addressDetails.map(({name, label, type, placeholder}, index) => (
                           <Grid item xs={12} sm={6} md={4} lg={3} className={`${index === 0 ? "p-0" : ""}`}>
                               <Controller control={control}
                                           name={name}
                                           render={({field, fieldState: {error}}) => (
                                               <FormControl className={"w-[90%] flex flex-col space-y-2"}>
                                                   <div className={"text-base-bold-gray"}>{label}</div>
                                                   <Input placeholder={placeholder}
                                                          type={type}
                                                          errorMessage={error?.message ?? ""}
                                                          variant={"filled"}
                                                          {...field}/>
                                               </FormControl>)}/>
                           </Grid>))}
                   </Grid>}
                   <Controller
                       control={control}
                       name={"comment"}
                       render={({field, fieldState : {error}}) => (
                           <FormControl className={"flex flex-col space-y-2"}>
                               <div className={"text-base-bold-gray"}>
                                   {t("Comment")}
                               </div>
                               <Input placeholder={t("Comment")}
                                      type={"text"}
                                      errorMessage={error?.message?? ""}
                                      variant={"filled"}
                                      {...field}/>
                           </FormControl>)}/>
                   <div className="flex items-center space-x-4">
                       <CustomSwitch onChange={(e) => {
                           if(e.target.checked) {
                               AddressStore.setDontCall(true);
                           }
                           else {
                               AddressStore.setDontCall(false);
                           }
                       }}/>
                       <div className="text-base-bold">
                           {t("Don't call")}
                       </div>
                   </div>
               </Stack>
               <Stack spacing={3}>
                    <div className="text-3xl-bold">
                        {t("Delivery date and time")}
                    </div>
                   <div className="flex space-x-4 items-center">
                       <CustomSwitch checked={deliverySoon} onChange={(e) => setDeliverySoon(prev => !prev)}/>
                       <div className="text-base-bold">
                           {t("Delivery soon")}
                       </div>
                   </div>
                   {!deliverySoon && (<div className="w-full flex space-x-4">
                       <div className="w-full flex flex-col space-y-2">
                           <Controller
                               control={control}
                               name={"date"}
                               render={({field, fieldState: {error}}) => (
                                   <FormControl className={"flex flex-col space-y-2"}>
                                       <div className="text-base-bold-gray">{t("Date")}</div>
                                       <CustomDatePicker errorMessage={""} placeholder={t("Choose date")} {...field}/>
                                   </FormControl>
                               )}/>
                       </div>
                       <div className="w-full flex flex-col space-y-2">
                           <Controller
                               control={control}
                               name={"time"}
                               render={({field, fieldState: {error}}) => (
                                   <FormControl className={"flex flex-col space-y-2"}>
                                       <div className="text-base-bold-gray">{t("Time")}</div>
                                       <CustomTimePicker errorMessage={""} placeholder={t("Choose time")} {...field}/>
                                   </FormControl>
                               )}/>
                       </div>
                   </div>)}

               </Stack>
               <Stack spacing={3}>
                   <Stack spacing={2}>
                       <div className="text-3xl-bold">
                           {t("Payment")}
                       </div>
                       <div className="text-xs-light-gray">{t("Payment_text")}</div>
                   </Stack>
                   <div
                       onClick={() =>setOpenPaymentMethods(true)}
                       className="w-full rounded-2xl max-h-[58px] border border-gray-default pl-6 pr-4 py-4  cursor-pointer">
                       <PaymentMethodCardContent/>
                   </div>
                   <div className="w-full flex space-x-2 items-start">
                       <div className="w-full">
                           <Controller
                               control = {control}
                               name = "promocode"
                               render = {({field, fieldState : {error}, formState : {errors}}) => (
                                   <FormControl className={"w-full"}>
                                       <Input placeholder={t("Promocode")}
                                              type={"text"}
                                              errorMessage={promoStatus === "error" ? promoMessage : ""}
                                              variant={"filled"}
                                              {...field}/>
                                       {promoStatus === "success" && <div className={"text-xs-bold mt-1 text-green-text"}>{t("Promo is applied")}</div>}
                                   </FormControl>
                               )}
                           />
                       </div>
                       <Button onClick={handleApplyPromocode} theme={"tertiary"} text={t("Apply")} extraClasses={"!max-h-[56px]"}/>
                   </div>
               </Stack>
               <Stack spacing={3}>
                   <Stack spacing={2}>
                       <div className="text-3xl-bold">
                           {t("Support")}
                       </div>
                       <div className="text-xs-light-gray">{t("Support_text")}</div>
                   </Stack>
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
           </Stack>
        </Grid>
       <Grid xs={12} lg={4} xl={4}>
            <CartPriceInfoPanel goodCount={totalGoodCount}
                                totalGoodPrice={totalGoodPrice}
                                discount={totalDiscountPrice}
                                deliveryPrice={deliveryPrice}
                                totalPrice={totalPrice}
                                handleClickCreateOrder={handleCreateOrder}
            />
        </Grid>

        <AddressListModalContent open={openAddressList} onClose={() => setOpenAddressList(false)}/>
        <PaymentMethodsContentModal open={openPaymentMethods} onClose={handleClosePaymentMethodsModal}/>
        <Modal onCloseIconClicked={() => UIStore.setIsPickAddressModalOpen(false)} open={UIStore.isPickAddressModalOpen}>
            <AnimateModalContentWrapper>
                <AddressModalContent
                    onOpenAddressList={handleOpenAddressList}
                    onClose={() => UIStore.setIsPickAddressModalOpen(false)}/>
            </AnimateModalContentWrapper>
        </Modal>

        <Snackbar
            anchorOrigin={{vertical : 'top', horizontal : 'right'}}
            resumeHideDuration={2000}
            TransitionComponent={Slide}
            TransitionProps={{
                dir: 'left'
            }}
            open={toast?.open ?? false} autoHideDuration={2000} onClose={handleCloseToast}>
            <Alert onClose={handleCloseToast} severity={toast?.status ?? "success"} sx={{ width: '100%' }}>
                {t(toast?.message)}
            </Alert>
        </Snackbar>

    </Grid>;
});