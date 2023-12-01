import {makeAutoObservable} from "mobx";
import {AddressToClient} from "@/types/common";



export type AddressType = 'Delivery' | 'Pickup'

class AddressStore {

    //States
    activeAddressId = "";
    activeAddress : null | AddressToClient = null;
    isPrivateHome = false;
    dontCall = false;
    addressType = 'Delivery';

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

    setAddressType = (addressType: AddressType) => {
        this.addressType = addressType
    }


}

export  default new AddressStore()