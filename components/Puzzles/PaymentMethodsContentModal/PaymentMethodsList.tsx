import {Stack} from "@mui/material";
import PlusIcon from "@/public/icons/plus.svg";
import {Button} from "@/components/Button";
import {useTranslations} from "use-intl";
import {usePayment} from "@/hooks/usePayment";


interface IPaymentMethodsList {
    handleStartAddCard : () => void,
}

export const PaymentMethodsList : React.FC<IPaymentMethodsList> = ({handleStartAddCard}) => {
    const t = useTranslations("Payment");
    const {cards, paymentMethods} = usePayment()

    const handleSaveClick = () => {

    }

    return  <Stack spacing={3}>
        <div className="text-3xl-bold">
            {t("Payment methods")}
        </div>
        <Stack>
            {paymentMethods.map(({title, Icon}, index) => (
                <div className={"w-full px-3 py-4 flex space-x-4 hover:bg-gray-background"}>
                    <Icon className={"fill-gray-primary"}/>
                    <div className={"text-base-bold"}>
                        {title}
                    </div>
                </div>
            ))}
            <div onClick={handleStartAddCard} className={"w-full px-3 py-4 flex space-x-4 hover:bg-gray-background"}>
                <PlusIcon/>
                <div className={'text-base-bold'}>
                    {t("Add card")}
                </div>
            </div>
        </Stack>
        <Button onClick={handleSaveClick}  theme={"primary"} text={t("Save")}/>
    </Stack>
}