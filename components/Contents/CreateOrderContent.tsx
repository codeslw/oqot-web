"use client";
import {FormControl, FormGroup, FormLabel, Grid, Stack, Switch} from "@mui/material";
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
import {useMutationApi} from "@/hooks/useMutationApi";
import api from "@/api/api";
import {Modal} from "@/components/Modal";
import {AddCard} from "@/components/Puzzles/PaymentMethodsContentModal/AddCard";


export const CreateOrderContent = observer(() => {

    const t = useTranslations("CreateOrder");
    const deliveryPrice = 0;
    const {control, handleSubmit, watch, setError} = useForm();
    const [openAddressList, setOpenAddressList] = useState(false);
    const [promoStatus, setPromoStatus] = useState("");
    const [promoMessage, setPromoMessage] = useState("");
    const [openPaymentMethods, setOpenPaymentMethods] = useState(true);
    //watch
    const promocode = watch("promocode");

    const checkPromocode = async () => {
        try {
            const response = await api.get(`/promo/checkpromo/${promocode}`);
            if (response.status === 200 && response.data.isValid) {
                setPromoStatus("success");
                setPromoMessage(response.data.message);
            }
            else if(!response.data?.isValid) {
                setPromoStatus("error");
                setPromoMessage(response.data.message);
                setError("promocode", {message: response.data.message});
            }
        } catch (e) {
            setPromoStatus("error");
        }

    };

    useEffect(() => {
        setPromoMessage("");
        setPromoStatus("");
        const timer = setTimeout(() => {
            if(promocode){
                checkPromocode();
            }
        }, 800);


        return () => {
            clearTimeout(timer);
        };
    }, [promocode]);

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


    return  <Grid container>
        <Grid xs={12} lg={9} xl={8}>
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
                   <div className="w-full flex space-x-4">
                       <div className="w-full flex flex-col space-y-2">
                           <Controller
                               control={control}
                               name={"date"}
                               render={({field, fieldState : {error}}) => (
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
                               render={({field, fieldState : {error}}) => (
                                   <FormControl className={"flex flex-col space-y-2"}>
                                        <div className="text-base-bold-gray">{t("Time")}</div>
                                        <CustomTimePicker errorMessage={""} placeholder={t("Choose time")} {...field}/>
                                   </FormControl>
                               )}/>
                       </div>
                   </div>
               </Stack>
               <Stack spacing={3}>
                   <Stack spacing={2}>
                       <div className="text-3xl-bold">
                           {t("Payment")}
                       </div>
                       <div className="text-xs-light-gray">{t("Payment_text")}</div>
                   </Stack>
                   <div className="w-full rounded-2xl border border-gray-default px-6 py-4 flex">
                       <div className="text-base-light-gray">
                           {t("Choose payment method")}
                       </div>
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
                                              errorMessage={promoStatus ==="error" ? promoMessage : ""}
                                              variant={"filled"}
                                              {...field}/>
                                       {promoStatus === "success" && <div className={"text-xs-bold mt-1 text-green-text"}>{t("Promo is applied")}</div>}
                                   </FormControl>
                               )}
                           />
                       </div>
                       <Button theme={"tertiary"} text={t("Apply")} extraClasses={"!max-h-[56px]"}/>
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
       <Grid xs={12} lg={3} xl={4}>
            <CartPriceInfoPanel goodCount={totalGoodCount}
                                totalGoodPrice={totalGoodPrice}
                                discount={totalDiscountPrice}
                                deliveryPrice={deliveryPrice}
                                totalPrice={totalPrice}/>
        </Grid>

        <AddressListModalContent open={openAddressList} onClose={() => setOpenAddressList(false)}/>
        <Modal open={openPaymentMethods} onCloseIconClicked={() => setOpenPaymentMethods(false)}>
            <AddCard/>
        </Modal>


    </Grid>;
});