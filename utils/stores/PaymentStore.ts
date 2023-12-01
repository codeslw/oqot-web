import {makeAutoObservable} from "mobx";


type TPaymentMethod = number | null

class PaymentStore {

    paymentMethod : TPaymentMethod = null;
    paymentCardId : string | null = null;

    constructor() {
        makeAutoObservable(this)
    }

    setPaymentMethod = (method: TPaymentMethod) => {
        this.paymentMethod = method
    }

    setPaymentCardId = (id: string | null) => {
        this.paymentCardId = id
    }


}

export  default new PaymentStore()