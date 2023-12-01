import {Checkbox, FormControl, FormLabel, Stack} from "@mui/material";
import {useTranslations} from "use-intl";
import LeftArrow from  "@/public/icons/left-arrow.svg";
import {Controller, useForm} from "react-hook-form";
import {Input} from "@/components/Input";
import FlagUzIcon from "@/public/icons/Flag-1.svg";
import InputMask from "react-input-mask";
import React, {useEffect} from "react";
import {Button} from "@/components/Button";
import {observer} from "mobx-react-lite";
import CreditCardIcon from "@/public/icons/credit-card.svg";
import UIStore from "@/utils/stores/UIStore";
import {AnimateModalContentWrapper} from "@/components/Wrappers/AnimateModalContentWrapper";
import {usePayment} from "@/hooks/usePayment";
import {formatCardNumber, formatExpireDate} from "@/utils/services";
import {AxiosResponse} from "axios";


interface  IAddCard {
    handleAddCardSave : (cardId : string) => void;
}

export const AddCard : React.FC<IAddCard> = observer(({handleAddCardSave}) => {
    const t = useTranslations("Payment");
    const {addCard} = usePayment();
    const {control, handleSubmit, watch, setError} = useForm();

    const card = watch("cardNumber");


    const handleSaveCardInfo = () => {
        handleSubmit(async (data) => {
            console.log(data, " data")
            try {
                const response : any = await addCard.mutateAsync({
                    cardNumber: formatCardNumber(data.cardNumber),
                    cardExpire: formatExpireDate(data.expiryDate),
                })
                if(response.status < 400) {
                    handleAddCardSave(response.data.cardId as string);
                }
            }
            catch (e) {
                setError("cardNumber", {
                    type : "value",
                    message : t("Wrong card number")
                })
                setError("expiryDate", {
                    type : "value",
                    message : " "
                })
            }
        })()
    }

    const handleBackToPaymentMethodsList = () => {
        UIStore.setActivePaymentStage("list")
    }

    return <AnimateModalContentWrapper>
    <Stack spacing={3}>
        <Stack spacing={2}>
            <div className="flex items-center space-x-2">
                <LeftArrow onClick={handleBackToPaymentMethodsList} className={"fill-gray-secondary cursor-pointer"}/>
                <div className="text-3xl-bold">
                    {t("Adding Card")}
                </div>
            </div>
            <div className="text-base-light-gray max-w-[30rem]">
                {t("Add Card_text")}
            </div>
        </Stack>
        <div className="flex space-x-4">
            <Controller
            control={control}
            name={"cardNumber"}
            render={({field, fieldState : {error}}) => (
                <FormControl className={"w-full flex flex-col space-y-1"}>
                    <FormLabel className={"text-base-bold-gray"}>{t("Card Number")}</FormLabel>
                    <InputMask
                        mask="0000 0000 0000 0000"
                        maskChar={" "}
                        formatChars={{
                            "0": "[0-9]"
                        }}
                        alwaysShowMask={false}
                        {...field}
                    >
                        {/*@ts-ignore*/}
                        {() => <Input id={"cardNumber"}
                                      placeholder={"0000 0000 0000 0000"}
                                      errorMessage={error?.message ?? ""}
                                      variant={"filled"}
                                      EndIcon={CreditCardIcon}
                                      lightBackground
                        />}
                    </InputMask>
                </FormControl>
                    )}
            />
            <Controller
                control = {control}
                name={"expiryDate"}
                render={({field, fieldState : {error}}) => (
                    <FormControl className={"flex flex-col space-y-1"}>
                        <FormLabel className={"text-base-bold-gray"}>{t("Expiry")}</FormLabel>
                        <InputMask
                            mask="00/00"
                            maskChar={" "}
                            formatChars={{
                                "0": "[0-9]"
                            }}
                            alwaysShowMask={false}
                            {...field}
                        >
                            {/*@ts-ignore*/}
                            {() => <Input id={"expiryDate"}
                                          placeholder={t("mm/yy")}
                                          errorMessage={error?.message ?? ""}
                                          variant={"filled"}
                                          lightBackground/>}
                        </InputMask>
                    </FormControl>
                )}
            />
        </div>
        <div className="flex space-x-0 items-center">
            <Checkbox/>
            <div className="text-base-light">
                {t("Save for next purchases")}
            </div>
        </div>
        <Button onClick={handleSaveCardInfo} theme={"primary"} text={t("Add")}/>
    </Stack>
    </AnimateModalContentWrapper>
})