import PaymentStore from "@/utils/stores/PaymentStore";
import CashIcon from "@/public/icons/cash.svg";
import CreditCardIcon from "@/public/icons/credit-card.svg";
import UzcardIcon from "@/public/icons/Uzcard_logo.svg";
import {usePayment} from "@/hooks/usePayment";
import {observer} from "mobx-react-lite";
import {useTranslations} from "use-intl";
import {IconButton} from "@mui/material";
import RightChevron from "@/public/icons/right-chevron.svg";

export const PaymentMethodCardContent = observer(() => {
    const t = useTranslations("Payment");
    const {paymentMethods} = usePayment()


    const renderPaymentMethodCardContent = () => {
        if(PaymentStore.paymentMethod === 0) {
            return <div className={'flex space-x-4 items-center'}>
                <CashIcon className={"fill-gray-secondary"}/>
                <div className="text-base-bold">
                    {t("Cash to courier")}
                </div>
            </div>
        }
        else if(PaymentStore.paymentMethod === 2 && PaymentStore.paymentCardId !== null) {
            return <div className = "flex space-x-4 items-center">
                <UzcardIcon className={"!w-6 !h-6 object-contain"}/>
                <div className="text-base-bold">
                    {paymentMethods.find((item) => item.id === PaymentStore.paymentCardId)?.title}
                </div>
            </div>
        }
        else if (PaymentStore.paymentMethod === 2 && PaymentStore.paymentCardId === null) {
            return <div className={'flex space-x-4 items-center'}>
                <CreditCardIcon className={"fill-gray-secondary"}/>
                <div className="text-base-bold">
                    {t("Online card")}
                </div>
            </div>
        }
        else if (PaymentStore.paymentMethod === null) {
            return <div className={"flex justify-between items-center h-full"}>
                <div className="text-base-light-gray">
                    {t("Choose payment method")}
                </div>
                <IconButton className={"p-0"}>
                    <RightChevron className={"fill-gray-secondary"}/>
                </IconButton>
            </div>
        }
    }

    return <>
        {renderPaymentMethodCardContent()}
    </>
})