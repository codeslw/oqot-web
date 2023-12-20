"use client"
import {ReactNode} from "react";
import addressStore from "@/utils/stores/AddressStore";
import UIStore from "@/utils/stores/UIStore";
import {observer} from "mobx-react-lite";
import {AddressListModalContent} from "@/components/Puzzles/AddressListModalContent";
import {usePathname, useRouter, useSearchParams} from "next/navigation";
import {ProductContent} from "@/components/Contents/ProductContent";
import {useQueryParams} from "@/hooks/useQueryParams";
import {AddressModalContent} from "@/components/Puzzles/AddressModalContent";
import {Modal} from "@/components/Modal";
import {CreditCardsList} from "@/components/Puzzles/CreditCardsList";
import PaymentStore from "@/utils/stores/PaymentStore";
import {AddCard} from "@/components/Puzzles/PaymentMethodsContentModal/AddCard";
import {PaymentMethodsContentModal} from "@/components/Puzzles/PaymentMethodsContentModal/PaymentMethodsContentModal";
import {Alert, Snackbar} from "@mui/material";
import {useTranslations} from "use-intl";

interface  IWithModalsWrapper {
    children : ReactNode
}
export const WithModalsWrapper : React.FC<IWithModalsWrapper> = observer(({children}) => {

    const queryParams = useSearchParams();
    const goodId  = queryParams.get("goodId");
    const router = useRouter();
    const pathname = usePathname();
    const {createQueryString, deleteQueryParam} = useQueryParams()
    const t = useTranslations("Errors")


    return <>
        {children}
         <ProductContent open={!!goodId} onClose={() => router.push(`${pathname}?${deleteQueryParam("goodId")}`)} goodId={goodId ?? ""}/>
        <AddressListModalContent open={UIStore.isAddressListOpen} onClose={() => UIStore.setIsAddressListOpen(false)}/>
        <Modal onCloseIconClicked={() => UIStore.setIsPickAddressModalOpen(false)} open={UIStore.isPickAddressModalOpen}>
            <AddressModalContent onClose={() => UIStore.setIsPickAddressModalOpen(false)}/>
        </Modal>
        <Modal
            className={"p-4"}
            onCloseIconClicked={() => UIStore.setIsCardListOpen(false)} open={UIStore.isCardListOpen}>
            <CreditCardsList/>
        </Modal>
        <Snackbar
            open={UIStore.showDeleteCardError}
            onClose={() => UIStore.setShowDeleteCardError(false)}
            autoHideDuration={2000}
            anchorOrigin={{
                vertical : "top",
                horizontal : "center"
            }}
        >
            <Alert severity="error">{t("Error occurred when deleting card!")}</Alert>
        </Snackbar>

        <Snackbar
            open={UIStore.showDeleteAddressError}
            onClose={() => UIStore.setShowDeleteAddressError(false)}
            autoHideDuration={2000}
            anchorOrigin={{
                vertical : "top",
                horizontal : "center"
            }}
        >
            <Alert severity="error">{t("Error occurred when deleting address!")}</Alert>
        </Snackbar>


        <Snackbar
            open={!!UIStore.generalError}
            onClose={() => UIStore.setGeneralError("")}
            autoHideDuration={2000}
            anchorOrigin={{
                vertical : "top",
                horizontal : "center"
            }}
        >
            <Alert severity="error">{UIStore.generalError}</Alert>
        </Snackbar>




        <PaymentMethodsContentModal open={UIStore.activePaymentStage === "addCard" || UIStore.activePaymentStage === "verify"}
                                    onClose={() => UIStore.setActivePaymentStage(null)}/>

    </>
})