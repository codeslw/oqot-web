"use client";
import {Stack} from "@mui/material";
import LeftArrow from "../../public/icons/left-arrow.svg";
import {useTranslations} from "use-intl";
import {usePinInput} from "@/hooks/usePinInput";
import CustomPinInput from "@/components/Customs/CustomPinInput";
import {Button} from "@/components/Button";
import {useAuth} from "@/hooks/useAuth";
import {useEffect, useState} from "react";
import Countdown from "@/components/Puzzles/Countdown";
import UIStore from "@/utils/stores/UIStore";

interface IVerifyPhoneNumberModalContent {
    phoneNumber: string;
    handleContinue: (pin: string[]) => void;
    handleResend: (e: any) => void;
    startTime: any;
    onFinishTimer: () => void;
    finished: boolean;
    handleGoBack: () => void;
}

export const VerifyPhoneNumberModalContent: React.FC<IVerifyPhoneNumberModalContent> = ({
                                                                                            phoneNumber,
                                                                                            handleContinue,
                                                                                            handleResend,
                                                                                            startTime,
                                                                                            finished,
                                                                                            onFinishTimer,
                                                                                            handleGoBack
                                                                                        }) => {

    const t = useTranslations("Authentication");
    const {
        pin,
        setPin,
        handlePinChange
    } = usePinInput();
    const {
        handleVerify,
        verificationError
    } = useAuth();
    const [pinError, setPinError] = useState();


    return (
        <Stack spacing={3} width={["30rem"]}>
            <Stack spacing={2}>
                <div
                    onClick={() => handleGoBack()}
                    className="flex space-x-3 items-center cursor-pointer">
                    <LeftArrow className={"fill-gray-secondary hover:fill-gray-focus"}/>
                    <div className="text-3xl-bold">{t("Confirm PhoneNumber")}</div>
                </div>
                <div className="text-base-light-gray">
                    {t("SendCode_text")} {phoneNumber}
                </div>
            </Stack>
            <CustomPinInput handlePinChange={handlePinChange} pin={pin} setPin={setPin}
                            errorMessage={verificationError ? t("WrongCode") : undefined}/>
            <Stack spacing={2}>
                {finished ? <div
                    onClick={handleResend}
                    className="px-6 py-4 flex items-center justify-center text-base-bold hover:text-base-bold-gray cursor-pointer">
                    {t("Resend Code")}
                </div> : <Countdown
                    onFinish={onFinishTimer}
                    targetDate={new Date(startTime.getTime() + 60 * 1000)}/>}
                <Button onClick={() => handleContinue(pin)} theme={"primary"} text={t("Confirm")}/>
            </Stack>
        </Stack>
    );
};
