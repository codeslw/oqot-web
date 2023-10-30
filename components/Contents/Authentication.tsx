"use client";
import {Modal} from "@/components/Modal";
import React, {ChangeEvent, useCallback, useEffect, useState} from "react";
import {useModal} from "@/hooks/useModal";
import {Stack} from "@mui/material";
import {useTranslations} from "use-intl";
import {Input} from "@/components/Input";
import {Button} from "@/components/Button";
import {ACCESS_TOKEN_KEY} from "@/utils/constants";
import FlagUzIcon from "@/public/icons/Flag-1.svg";
import InputMask from "react-input-mask";
import {useAuth} from "@/hooks/useAuth";
import {usePinInput} from "@/hooks/usePinInput";
import {VerifyPhoneNumberModalContent} from "@/components/Puzzles/VerifyPhoneNumberModalContent";
import {EnterPhoneNumberModalContent} from "@/components/Puzzles/EnterPhoneNumberModalContent";
import {RegistrationModalContent} from "@/components/Puzzles/RegistrationModalContent";
import {log} from "util";
import {formatDate} from "@/utils/services";


export const Authentication = () => {

    const {open, onOpen, onClose} = useModal();
    const t = useTranslations("Authentication");
    const [phoneNumber, setPhoneNumber] = useState("");

    const {handleAuth,
        verificationSend,
        handleChangeAuthStage,
        currentAuthStage,
        handleVerify,
        handleRegister,
        cancelVerificationOrRegistration} = useAuth();

    const onPhoneChange = (e : ChangeEvent<HTMLInputElement>) => {
        setPhoneNumber(e.target.value);
    };

    useEffect(() => {
        onOpen();
    }, []);

    useEffect(() => {
        if(verificationSend) {

        }
    }, [verificationSend]);

    const onSendCodeClick = useCallback((event: React.MouseEvent<HTMLButtonElement>) => {
        handleAuth(phoneNumber);
    }, [phoneNumber, handleAuth]);

    const handleContinueClick = async (pin: string[]) => {
        if (pin.length === 6) {
           await handleVerify(phoneNumber, pin.join(""));
        }
    };

    const handleRegistrationFormSubmit = (data : any, photoPath : string) => {
        handleRegister({
            firstName: data.firstName,
            lastName: data.lastName,
            birthday: formatDate(data.date),
            avatarPhotoPath: photoPath,
            phoneNumber : phoneNumber,
            sex : 1,
            password : "",
            middleName : ""
        });
    };


    useEffect(() => {
        if (currentAuthStage === "success" || currentAuthStage === "cancelled") {
            onClose();
        }
    }, [currentAuthStage]);

    const renderContent = () => {
        switch (currentAuthStage) {
            case "enterPhone":
                return <EnterPhoneNumberModalContent phoneNumber={phoneNumber} onPhoneChange={onPhoneChange} onSendCodeClick={onSendCodeClick}/>;
            case "enterCode":
                return <VerifyPhoneNumberModalContent phoneNumber={phoneNumber} handleContinue={handleContinueClick}/>;
            case "registration" :
                return <RegistrationModalContent handleRegistration={handleRegistrationFormSubmit}/>;
            default :
                return <></>;
        }

    };

    return (
        <Modal open={open} onCloseIconClicked={onClose} onClose={onClose}>
            {renderContent()}
        </Modal>
    );
};
