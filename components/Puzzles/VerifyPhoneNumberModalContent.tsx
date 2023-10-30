"use client";
import {Stack} from "@mui/material";
import LeftArrow from "../../public/icons/left-arrow.svg";
import {useTranslations} from "use-intl";
import {usePinInput} from "@/hooks/usePinInput";
import CustomPinInput from "@/components/Customs/CustomPinInput";
import {Button} from "@/components/Button";
import {useAuth} from "@/hooks/useAuth";
import {useEffect, useState} from "react";

interface IVerifyPhoneNumberModalContent {
    phoneNumber : string;
    handleContinue : (pin : string[]) => void;
}

export const VerifyPhoneNumberModalContent:React.FC<IVerifyPhoneNumberModalContent> = ({phoneNumber, handleContinue}) => {

    const t = useTranslations("Authentication");
    const {pin, setPin, handlePinChange} = usePinInput();
    const {handleVerify, verificationError} = useAuth();
    const [pinError, setPinError] = useState();




    return (
        <Stack spacing={3} width={["30rem"]}>
            <Stack spacing={2}>
                <div className="flex space-x-3 items-center">
                    <LeftArrow className={"fill-gray-secondary"}/>
                    <div className="text-3xl-bold">{t("Confirm PhoneNumber")}</div>
                </div>
                <div className="text-base-light-gray">
                    {t("SendCode_text")} {phoneNumber}
                </div>
            </Stack>
            <CustomPinInput handlePinChange={handlePinChange} pin={pin} setPin={setPin} errorMessage = {verificationError ? t("WrongCode") : undefined}/>
            <Stack spacing = {2}>
                <div className="px-6 py-4 flex items-center justify-center text-base-bold">
                    {t("Resend Code")}
                </div>
                <Button onClick={() => handleContinue(pin)} theme={"primary"} text={t("Confirm")}/>
            </Stack>
        </Stack>
    );
};
