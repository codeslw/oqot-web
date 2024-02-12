import {makeAutoObservable} from "mobx";



type TActivePaymentStage = "list" | "addCard" | "verify" | "close"

class UIStore {

    //States
    isMobileAddressPopupOpen = false;
    isMobileLanguagePopupOpen = false;
    isMobileAddressListOpen = false;
    isTokenWrong = false;
    isAddressListOpen = false;
    isCardListOpen = false;



    activePaymentStage : null | TActivePaymentStage = null
    isPickAddressModalOpen = false;


    //Errors
    showDeleteCardError = false;
    showDeleteAddressError = false;
    generalError = "";

    constructor() {
        makeAutoObservable(this)
    }


    //Actions
    openMobileAddressPopup() {
        this.isMobileAddressPopupOpen = true;
    }
    closeMobileAddressPopup() {
        this.isMobileAddressPopupOpen = false;
    }
    openMobileLanguagePopup() {
        this.isMobileLanguagePopupOpen = true;
    }
    closeMobileLanguagePopup() {
        this.isMobileLanguagePopupOpen = false;
    }

    setActivePaymentStage(stage: TActivePaymentStage | null) {
        this.activePaymentStage = stage;
    }

    setIsPickAddressModalOpen(isOpen: boolean) {
        this.isPickAddressModalOpen = isOpen;
    }

    setIsTokenWrong(isWrong: boolean) {
        this.isTokenWrong = isWrong
    }

    setIsAddressListOpen(isOpen: boolean) {
        this.isAddressListOpen = isOpen;
    }

    setIsCardListOpen(isOpen: boolean) {
        this.isCardListOpen = isOpen;
    }

    setShowDeleteCardError(showDeleteCardError: boolean) {
        this.showDeleteCardError = showDeleteCardError
    }

    setShowDeleteAddressError(showDeleteAddressError: boolean) {
        this.showDeleteAddressError = showDeleteAddressError
    }

    setGeneralError(generalError: string) {
        this.generalError = generalError
    }

    setOpenedMobileAddressList(isOpen: boolean) {
        this.isMobileAddressListOpen = isOpen;
    }

}

export  default new UIStore()