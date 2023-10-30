import {Modal} from "@/components/Modal";
import {Stack} from "@mui/material";
import {useTranslations} from "use-intl";
import {useMemo, useState} from "react";
import CashIcon from "@/public/icons/cash.svg";
import CreditCardIcon from "@/public/icons/credit-card.svg";
import TerminalIcon from "@/public/icons/terminal.svg";
import  PlusIcon from "@/public/icons/plus.svg";
import {Button} from "@/components/Button";
import UIStore from "@/utils/stores/UIStore";
import {PaymentMethodsList} from "@/components/Puzzles/PaymentMethodsContentModal/PaymentMethodsList";
import {AddCard} from "@/components/Puzzles/PaymentMethodsContentModal/AddCard";
import {VerifyCard} from "@/components/Puzzles/PaymentMethodsContentModal/VerifyCard";
import {usePayment} from "@/hooks/usePayment";

interface IPaymentMethodsContentModal {
    open : boolean,
    onClose : () => void
}

export const PaymentMethodsContentModal : React.FC<IPaymentMethodsContentModal> = ({open, onClose}) => {

    const t = useTranslations("Payment");
    const {phoneNumber} = usePayment()


    const handleStartAddCard = () => {
        UIStore.setActivePaymentStage("addCard");
    }

    const handleSaveCard = (data : any) => {

        UIStore.setActivePaymentStage("verify");
    }


    const handleFinishCardAdding = () => {

        UIStore.setActivePaymentStage("list");
    }

    const renderContent = () => {
        switch (UIStore.activePaymentStage) {
            case "list" : return <PaymentMethodsList handleStartAddCard={handleStartAddCard}/>;
            case "addCard" : return <AddCard handleAddCardSave={handleSaveCard}/>;
            case "verify" : return <VerifyCard phoneNumber={phoneNumber} handleContinue={handleFinishCardAdding}/>;
            default : return <PaymentMethodsList handleStartAddCard={handleStartAddCard}/>;
        }

    };



    return (
        <Modal onCloseIconClicked={onClose} open ={open}>
            {renderContent()}
        </Modal>
    );
};
