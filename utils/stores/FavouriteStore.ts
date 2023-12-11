import {makeAutoObservable, observable, toJS} from "mobx";


class  FavouriteStore {

    favouriteGoods : string[]  = []
    constructor() {
        makeAutoObservable(this, {
            favouriteGoods : observable
        })
        this.favouriteGoods = toJS(this.favouriteGoods);
    }

    setFavouriteGoods(favouriteGoods: string[]) {
        this.favouriteGoods = [...favouriteGoods];
    }

    addToFavouriteGoods(id: string) {
        this.favouriteGoods.push(id);
    }

    removeFromFavouriteGoods(id: string) {
        this.favouriteGoods = this.favouriteGoods.filter(item => item !== id);
    }

}

export default  new FavouriteStore();