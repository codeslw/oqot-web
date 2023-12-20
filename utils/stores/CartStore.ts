import {makeAutoObservable, observable, toJS} from "mobx";
import {ca} from "date-fns/locale";
import {ICart} from "@/types/common";


export type ICartState = Omit<ICart, | "clientId">;



class CartStore {

    cart : ICartState[] = observable.array([]);

    constructor() {
        makeAutoObservable(this, {
            cart : observable
        })
        this.cart = toJS(this.cart);
    }

    setCart(cart: ICartState[]) {
        this.cart = [...cart];
    }

    updateGoodCountInCart(id: string, count: number) {
        const foundIndex = this.cart.findIndex(item => item.goodId === id);
        if (foundIndex !== -1) {
            this.cart[foundIndex].count = count
        }
    }

    removeFromCart(goodId: string) {
        this.cart = this.cart.filter(item => item.goodId !== goodId);
    }

    addToCart(good: ICartState) {
        this.cart.push(good);
    }


}

export  default new CartStore()