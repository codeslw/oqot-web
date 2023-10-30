import {makeAutoObservable} from "mobx";
import {AddressToClient} from "@/types/common";



class AddressStore {

    //States
    activeAddressId = "";
    activeAddress : null | AddressToClient = null;
    isPrivateHome = false;
    dontCall = false;
    constructor() {
        makeAutoObservable(this)
    }

    //Actions

    setActiveAddressId = (id: string) => {
        this.activeAddressId = id
    }

    setPrivateHome = (isPrivateHome: boolean) => {
        this.isPrivateHome = isPrivateHome
    }

    setActiveAddress = (address:AddressToClient | null) => {
        this.activeAddress = address
    }

    setDontCall = (dontCall: boolean) => {
        this.dontCall = dontCall
    }


}

export  default new AddressStore()