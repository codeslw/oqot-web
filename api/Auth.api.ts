import api from "@/api/api";
import {USER_SEND_CODE_URL, USER_VERIFY_URL} from "@/utils/constants";

export const SendCode  = (phoneNumber : string) => {
    return api.post(USER_SEND_CODE_URL, {phoneNumber}, {
        baseURL : process.env.NEXT_PUBLIC_AUTH_URL
    })
}

export const VerifyPhoneNumber = (verificationCode : string, phoneNumber : string) => {
    return api.post(USER_VERIFY_URL, {verificationCode, phoneNumber}, {
        baseURL : process.env.NEXT_PUBLIC_AUTH_URL
    })
}
