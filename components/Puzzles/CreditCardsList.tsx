"use client"
import {Alert, CircularProgress, Snackbar, Stack} from "@mui/material";
import {useQueryApi} from "@/hooks/useQueryApi";
import UzCardIcon from "@/public/icons/Uzcard_logo.svg";
import {Empty} from "@/components/Shared/Empty";
import {useTranslations} from "use-intl";
import {Button} from "@/components/Button";
import PaymentStore from "@/utils/stores/PaymentStore";
import UIStore from "@/utils/stores/UIStore";
import CircleIcon from "@/public/icons/circle.svg"
import PlusIcon from "@/public/icons/plus.svg"
import XIcon from "@/public/icons/x.svg"
import {observer} from "mobx-react-lite";
import {useMutationApiAdvanced} from "@/hooks/useMutationApi";
import {useState} from "react";


export const CreditCardsList = observer(() => {
    const t = useTranslations("Payment")
    const cards = useQueryApi("/psp/cards", {}, {});
    const [loadingId, setLoadingId] = useState('');
    const [showError, setShowError] = useState(false);
    const deleteCard = useMutationApiAdvanced("/psp/cards", "delete", {})

    const handleRemoveCard = async (id: string) => {
        setLoadingId(id);
        try {
            const response = await deleteCard.mutateAsync({
                slug: `/${id}`
            })
            if (response.status < 400) {
                cards.refetch()
                setLoadingId("")
            }
        } catch (e) {
            UIStore.setShowDeleteCardError(true);
            setLoadingId("")
        }

    }

    return <> <Stack spacing={0} className={"min-h-[15rem] min-w-[12rem] max-w-[24rem]"}>
        <h2 className={"text-3xl-bold mb-4"}>{t("My Cards")} </h2>
        {cards.isLoading ? <div className={"w-full h-[30rem] flex-center"}>
                <CircularProgress className={"text-orange-default"}/>
            </div>
            : cards?.data?.data?.length === 0 ?
                <Empty title={t("Cards not found")} message={t("Cards not found_text")}/> :
                cards?.data?.data?.map((card: any) => {
                    return <div
                        onClick={() => PaymentStore.setPaymentCardId(card.id)}
                        className={"p-3 flex space-x-4 rounded-xl hover:bg-gray-background cursor-pointer"}>
                        <CircleIcon
                            className={`${card.id === PaymentStore.paymentCardId ? "fill-orange-default" : "fill-gray-secondary"}`}/>
                        <UzCardIcon/>
                        <div>
                            {card.pan}
                        </div>
                        {loadingId === card.id
                            ? <CircularProgress size={12} className={"text-black-primary"}/>
                            : <XIcon
                                className={"fill-gray-secondary"}
                                onClick={() => handleRemoveCard(card.id)}
                            />}
                    </div>
                })
        }
        <div className={'mt-auto flex justify-center'}>
            <Button
                onClick={() => {
                    UIStore.setActivePaymentStage("addCard")
                }}
                startIcon={<PlusIcon className={"fill-black-primary"}/>}
                extraClasses={"w-full"}
                theme={"primary"} text={t("Add card")}/>
        </div>

    </Stack>

    </>
})