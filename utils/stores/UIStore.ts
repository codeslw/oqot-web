import {makeAutoObservable} from "mobx";



type TActivePaymentStage = "list" | "addCard" | "verify"

class UIStore {

    //States
    isMobileAddressPopupOpen = false;
    isMobileLanguagePopupOpen = false;

    activePaymentStage : null | TActivePaymentStage = null


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

}

export  default new UIStore()