import {useMemo, useState} from "react";
import CashIcon from "@/public/icons/cash.svg";
import CreditCardIcon from "@/public/icons/credit-card.svg";
import UzcardIcon from "@/public/icons/Uzcard_logo.svg";
import TerminalIcon from "@/public/icons/terminal.svg";
import {useTranslations} from "use-intl";
import {useQueryApi} from "@/hooks/useQueryApi";
import {AxiosResponse} from "axios";
import {useMutationApi} from "@/hooks/useMutationApi";




interface IPSPCard {

    id: string,
    token: string,
    username: string,
    pan: string,
    expiry: string,
    status: number,
    phone: string,
    fullName: string,
    balance: number,
    sms: true

}

interface IPaymentMethod {
    isMethod: boolean,
    id : string | number,
    title : string,
    Icon: any

}

export const usePayment = () => {
    const t = useTranslations("Payment");

    const [verificationError, setVerificationError] = useState(false);
    const [phoneNumber, setPhoneNumber] = useState("");
    const [cardId, setCardId] = useState('');

    const cards = useQueryApi<AxiosResponse<IPSPCard[]>>("/psp/cards/",{}, {});
    const addCard = useMutationApi("/psp/cards/register", "post", {});
    const confirmCard = useMutationApi("/psp/cards/confirm", "post", {});



    const paymentMethods : IPaymentMethod[] = useMemo(() => {

        const creditCards = cards?.data?.data?.map((card) => ({
            title : `${card.pan}`,
            Icon : UzcardIcon,
            id : card.id,
            isMethod : false
        })) ?? [];
        return [
            ...creditCards,
            {
                title : t("Cash to courier"),
                Icon : CashIcon,
                id : 0,
                isMethod : true,
            },
            {
                title : t("Online card"),
                Icon : CreditCardIcon,
                id: 2,
                isMethod : true,
            },


        ];
    }, [cards]);

    const handleFailVerification = (isError : boolean) => {
        setVerificationError(isError);
    }
    const handleStartVerification = (id : string) => {
        setCardId(id);
    }

    return {
        verificationError,
        cards,
        paymentMethods,
        phoneNumber,
        confirmCard,
        addCard,
        cardId,
        handleStartVerification,
        handleFailVerification
    };
};