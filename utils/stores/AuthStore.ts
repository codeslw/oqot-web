import {action, makeAutoObservable, observable} from "mobx";


class AuthStore {

    @observable isUserAuthenticated : null | boolean = null;

    constructor() {
        makeAutoObservable(this)
    }


    @action setIsUserAuthenticated(isUserAuthenticated: boolean | null) {
        this.isUserAuthenticated = isUserAuthenticated;
    }



}

export default  new AuthStore();