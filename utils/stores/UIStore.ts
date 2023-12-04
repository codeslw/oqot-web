import {makeAutoObservable} from "mobx";



type TActivePaymentStage = "list" | "addCard" | "verify" | "close"

class UIStore {

    //States
    isMobileAddressPopupOpen = false;
    isMobileLanguagePopupOpen = false;
    isTokenWrong = false;
    isAddressListOpen = false;

    activePaymentStage : null | TActivePaymentStage = null
    isPickAddressModalOpen = false;

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

}

export  default new UIStore()