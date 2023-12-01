import {FormGroup, Stack} from "@mui/material";
import InputMask from "react-input-mask";
import {Input} from "@/components/Input";
import FlagUzIcon from "@/public/icons/Flag-1.svg";
import {Button} from "@/components/Button";
import React, {ChangeEvent, Dispatch, LegacyRef, SetStateAction, useEffect, useMemo, useRef} from "react";
import {useTranslations} from "use-intl";



interface IEnterPhoneNumberModalContent {
    phoneNumber : string;
    onPhoneChange : (e : ChangeEvent<HTMLInputElement>) => void;
    onSendCodeClick : (e : React.MouseEvent<HTMLButtonElement>) => void;
}

export const EnterPhoneNumberModalContent : React.FC<IEnterPhoneNumberModalContent> = ({
    phoneNumber,
    onPhoneChange,
    onSendCodeClick
                                                                                       }) => {

    const t = useTranslations("Authentication");
    const inputRef : LegacyRef<HTMLInputElement> | undefined = useRef(null);

    useEffect(() => {
        if (inputRef.current) {
            inputRef.current.focus();
        }
    }, []);


    return (
        <Stack spacing={3}>
            <Stack spacing={2}>
                <div className="text-3xl-bold dark:text-black-primary">
                    {t("Authentication")}
                </div>
                <div className="text-base-light-gray max-w-[480px]">
                    {t("Authentication_text")}
                </div>
            </Stack>

            <Stack spacing={1}>

                <label htmlFor={"phoneNumber"} className={"text-base-bold-gray"}>{t("PhoneNumber")}</label>
                <InputMask
                    mask="+998 00 000 00 00"
                    maskChar={" "}
                    formatChars={{
                        "0": "[0-9]"
                    }}
                    alwaysShowMask={false}
                    value={phoneNumber}
                    onChange={(e: any) => onPhoneChange(e)}
                >
                    {/*@ts-ignore*/}
                    {() => <Input id={"phoneNumber"}
                                  placeholder={"00 000-00-00"}
                                  errorMessage={""}
                                  prefix={"+998 "}
                                  inputRef={inputRef}
                                  variant={"filled"}
                                  StartIcon={FlagUzIcon}
                                  startIconClasses={"rounded-full"}
                                  lightBackground

                    />}
                </InputMask>
            </Stack>
            <Button type={"submit"} theme={"primary"} text={t("Continue")} onClick={onSendCodeClick}/>

        </Stack>
    );
};
