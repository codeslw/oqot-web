import {Checkbox, FormControl, Stack} from "@mui/material";
import {useTranslations} from "use-intl";
import LeftArrow from  "@/public/icons/left-arrow.svg";
import {Controller, useForm} from "react-hook-form";
import {Input} from "@/components/Input";
import FlagUzIcon from "@/public/icons/Flag-1.svg";
import InputMask from "react-input-mask";
import React, {useEffect} from "react";
import {Button} from "@/components/Button";


interface  IAddCard {
    handleAddCardSave : (data : any) => void;
}

export const AddCard : React.FC<IAddCard> = ({handleAddCardSave}) => {
    const t = useTranslations("Payment");

    const {control, handleSubmit, watch} = useForm();

    const card = watch("cardNumber");


    const handleSaveCardInfo = () => {
        handleSubmit((data) => {
            handleAddCardSave(data);
        })()
    }

    return <Stack spacing={3}>
        <Stack spacing={2}>
            <div className="flex items-center space-x-2">
                <LeftArrow className={"fill-gray-secondary"}/>
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
                <FormControl className={"w-full"}>
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
                                      errorMessage={""}
                                      variant={"filled"}
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
                    <FormControl>
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
                                          errorMessage={""}
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

};