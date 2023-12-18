"use client"
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
import {observer} from "mobx-react-lite";
import {AnimatePresence ,motion} from "framer-motion";
import {AnimateModalContentWrapper} from "@/components/Wrappers/AnimateModalContentWrapper";

interface IPaymentMethodsContentModal {
    open : boolean,
    onClose : () => void
}

export const PaymentMethodsContentModal : React.FC<IPaymentMethodsContentModal> = observer(({open, onClose}) => {

    const t = useTranslations("Payment");
    const {phoneNumber,cardId, handleStartVerification} = usePayment()


    const handleStartAddCard = () => {
        UIStore.setActivePaymentStage("addCard");
    }

    const handleSaveCard = (cardId : string) => {
        handleStartVerification(cardId);
        UIStore.setActivePaymentStage("verify");
    }


    const handleFinishCardAdding = () => {
        UIStore.setActivePaymentStage("list");
    }

    const renderContent = () => {
        switch (UIStore.activePaymentStage) {
            case "list" : return <PaymentMethodsList handleStartAddCard={handleStartAddCard}/>;
            case "addCard" : return  <AddCard handleAddCardSave={handleSaveCard}/>;
            case "verify" : return <VerifyCard cardId={cardId} phoneNumber={phoneNumber} handleContinue={handleFinishCardAdding}/>;
            case "close" :
                onClose();
                return <></>;
            default : return <PaymentMethodsList handleStartAddCard={handleStartAddCard}/>;
        }

    };



    return (
        <Modal onCloseIconClicked={onClose} open ={open} isSmall>
                    {renderContent()}
        </Modal>
    );
});
