import {useEffect, useState} from "react";
import {useMutation} from "@tanstack/react-query";
import {ACCESS_TOKEN_KEY, AUTH_BASE_URL, REGISTER_URL, USER_SEND_CODE_URL, USER_VERIFY_URL} from "@/utils/constants";
import {SendCode, VerifyPhoneNumber} from "@/api/Auth.api";
import {assertAwaitExpression} from "@babel/types";
import {useMutationApi} from "@/hooks/useMutationApi";
import {AxiosResponse} from "axios";
import {IRegisterPayload} from "@/types/common";



interface  IVerifyPayload {

    verificationCode: string,
    phoneNumber: string

}



interface  IVerifyResponseData {
    tokenType: string,
    token: string,
    expiresAt: string,
    refreshToken: string

}

type AuthStage = "enterPhone" | "enterCode" | "registration" | "success" | "failure" | "cancelled";

export const useAuth = () => {
    let token : string | null = "";

    const [isUserAuthenticated, setIsUserAuthenticated] = useState(!!token);
    const [verificationSend, setVerificationSend] = useState(false);
    const [isVerified, setIsVerified] = useState(false);
    const [phoneNumberError, setPhoneNumberError] = useState(false);
    const [currentAuthStage, setCurrentAuthStage] = useState<AuthStage>("enterPhone");
    const [phoneNumber, setPhoneNumber] = useState("");
    const [verificationError, setVerificationError] = useState(false);
    const [registrationError, setRegistrationError] = useState(false);
    const sendCode = useMutation([USER_SEND_CODE_URL], (data : string) => SendCode(data), {});
    const verify  = useMutation([USER_SEND_CODE_URL], (data: IVerifyPayload) => VerifyPhoneNumber(data.verificationCode, data.phoneNumber), {});
    const register = useMutationApi<IVerifyResponseData, IRegisterPayload>(REGISTER_URL, "post", {}, {baseURL : AUTH_BASE_URL});


    useEffect(() => {
        token = localStorage.getItem(ACCESS_TOKEN_KEY);
    }, []);

    const handleAuth  = async (phoneNumber: string) => {
        setPhoneNumber(phoneNumber);
        try {
            const response : any = await sendCode.mutateAsync(phoneNumber.replace(/\s/g, ""));
            if (response.status < 400) {
                setVerificationSend(true);
                setCurrentAuthStage("enterCode");
            }
        }
        catch (e) {
            setPhoneNumberError(true);
        }
    };

    const handleVerify = async (phoneNumber : string, verificationCode : string) => {

        try {
            const response : any = await  verify.mutateAsync({
                phoneNumber : phoneNumber.replace(/\s/g, ""),
                verificationCode
            });
            if (response.status < 400 && response.data.token) {
                setCurrentAuthStage("success");
               // setIsVerified(true);
                localStorage.setItem("accessToken", response.data.token);
            }
            else if (response.status < 400 && !response?.data?.token) {
                setCurrentAuthStage("registration");
                setIsVerified(true);
            }
        }
        catch (e) {
            setIsVerified(false);
            setVerificationError(true);
        }
    };


    const handleRegister = async (data : IRegisterPayload) => {
        try {
            const response  = await register.mutateAsync(data);
            if (response.status < 400 && response.data.token) {
                setCurrentAuthStage("success");
                setRegistrationError(false);
            }
        }
        catch (e) {
            setRegistrationError(true);
        }
    };

    const handleChangeAuthStage = (stage : AuthStage) => {
        setCurrentAuthStage(stage);
    };

    const cancelVerificationOrRegistration = () => {
        setCurrentAuthStage("cancelled");
        setPhoneNumber("");
        setVerificationError(false);
        setVerificationSend(false);
        setIsUserAuthenticated(false);
        setIsVerified(false);
        setRegistrationError(false);
    };






    return {
        isUserAuthenticated,
        handleVerify,
        handleAuth,
        verificationSend,
        isVerified,
        phoneNumberError,
        handleChangeAuthStage,
        currentAuthStage,
        phoneNumber,
        handleRegister,
        registerLoading : register.isLoading,
        verificationError,
        cancelVerificationOrRegistration
    };
};
