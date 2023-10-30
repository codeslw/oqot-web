import {useMemo, useState} from "react";
import CashIcon from "@/public/icons/cash.svg";
import CreditCardIcon from "@/public/icons/credit-card.svg";
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

export const usePayment = () => {
    const t = useTranslations("Payment");

    const [verificationError, setVerificationError] = useState(false);
    const [phoneNumber, setPhoneNumber] = useState("");

    const cards = useQueryApi<AxiosResponse<IPSPCard[]>>("/psp/cards/",{}, {});
    const addCard = useMutationApi("/psp", "post", {});

    const paymentMethods = useMemo(() => {
        return [
            {
                title : t("Cash to courier"),
                Icon : CashIcon
            },
            {
                title : t("Online card"),
                Icon : CreditCardIcon,
            },
            {
                title : t("Terminal"),
                Icon : TerminalIcon
            },

        ];
    }, []);

    return {verificationError, cards,paymentMethods, phoneNumber};
};