import {Stack} from "@mui/material";
import PlusIcon from "@/public/icons/plus.svg";
import {Button} from "@/components/Button";
import {useTranslations} from "use-intl";
import {usePayment} from "@/hooks/usePayment";
import {useState} from "react";
import UIStore from "@/utils/stores/UIStore";
import {observer} from "mobx-react-lite";
import {AnimateModalContentWrapper} from "@/components/Wrappers/AnimateModalContentWrapper";
import PaymentStore from "@/utils/stores/PaymentStore";


interface IPaymentMethodsList {
    handleStartAddCard : () => void,
}

export const PaymentMethodsList : React.FC<IPaymentMethodsList> = observer(({handleStartAddCard}) => {
    const t = useTranslations("Payment");
    const {cards, paymentMethods} = usePayment();

    const [activePaymentMethod, setActivePaymentMethod] = useState<number | null>(null);

    const handleSaveClick = () => {
        UIStore.setActivePaymentStage("close");
    }

    const handlePaymentMethodClick = (id : string | number, isMethod : boolean) => {
        if(id !== 2 && typeof id !== "string") {
            setActivePaymentMethod(id)
            PaymentStore.setPaymentMethod(id)
            PaymentStore.setPaymentCardId(null)
        }
        else if(id === 2) {
            setActivePaymentMethod(2);
            PaymentStore.setPaymentMethod(2);
            UIStore.setActivePaymentStage("addCard")
        }
        else if(typeof id === "string" && !isMethod) {
            PaymentStore.setPaymentMethod(2);
            PaymentStore.setPaymentCardId(id);
        }
        else {
            setActivePaymentMethod(null)

        }
    }

    return  <AnimateModalContentWrapper>
        <Stack spacing={3}>
        <div className="text-3xl-bold w-[30rem] ml-3">
            {t("Payment methods")}
        </div>
        <Stack spacing={0.25}>
            {paymentMethods.map(({title, Icon, id, isMethod}, index) => (
                <div onClick={() => handlePaymentMethodClick(id, isMethod)} className={`w-full px-3 py-4 flex space-x-4 hover:bg-gray-background cursor-pointer rounded-2xl ${(activePaymentMethod === id || PaymentStore.paymentCardId === id) ? "bg-gray-background" : ""}`}>
                    <Icon className={"fill-gray-primary"}/>
                    <div className={"text-base-bold"}>
                        {title}
                    </div>
                </div>
            ))}
            <div onClick={handleStartAddCard} className={"w-full cursor-pointer px-3 py-4 flex space-x-4 hover:bg-gray-background rounded-2xl"}>
                <PlusIcon className={"fill-black-primary"}/>
                <div className={'text-base-bold'}>
                    {t("Add card")}
                </div>
            </div>
        </Stack>
        <Button onClick={handleSaveClick}  theme={"primary"} text={t("Save")}/>
    </Stack>
    </AnimateModalContentWrapper>
})