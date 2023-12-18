export interface PagedResponseDataWrapper<T> {
    pageIndex : number,
    totalCount : number,
    pageCount : number,
    data : T[]
}


export interface ICategory {
    id:                       string;
    name:                     string;
    nameRu:                   string;
    nameEn:                   string;
    nameUz:                   string;
    imageUrl:                 string;
    isMainCategory:           boolean;
    childCategoriesCount:     number;
    totalAvailableGoodsCount: number;
    goodsCount:               number;
    orderNumber:              number;
    isHidden:                 boolean;
    isVerified:               boolean;
    children:                 string[];
}

export type TCategories = {
    mainCategories : ICategory[]
}


export interface IRegisterPayload {
    phoneNumber: string,
    firstName: string,
    lastName: string,
    middleName: string,
    sex: number,
    password: string,
    birthday: string,
    avatarPhotoPath : string
}

export interface IStateCart  {id : string, count : number}


export interface ICart {
    id: string,
    goodId: string,
    goodName: string,
    goodPhotoPath: string,
    goodPrice: number,
    goodDiscount: number,
    clientId: string,
    count: number,
    maxCount: number
}


export interface IFavoriteGoodResponse {
    favoriteGoods: FavoriteGood[];
}

export interface FavoriteGood {
    id:        string;
    clientID:  string;
    goodID:    string;
    good:      Good;
    createdAt: Date;
    [key: string]: any;
}

export interface Good {
    id:            string;
    categories:    Category[];
    name:          string;
    nameRu:        string;
    nameEn:        string;
    nameUz:        string;
    description:   string;
    descriptionRu: string;
    descriptionEn: string;
    descriptionUz: string;
    note:          string;
    noteRu:        string;
    noteEn:        string;
    noteUz:        string;
    photoPath:     string;
    mass:          number;
    volume:        number;
    sellingPrice:  number;
    discount:      number;
    count:         number;
    storeToCount:  StoreToCount[];
    [key : string] : any
}

export interface Category {
    id:             string;
    isMainCategory: boolean;
    name:           string;
    nameRu:         string;
    nameEn:         string;
    nameUz:         string;
    imageURL:       string;
}

export interface StoreToCount {
    storeID: string;
    count:   number;
}

export interface IAddressToClientData {
    addressToClients: AddressToClient[];
}

export interface AddressToClient {
    id:             string;
    clientID:       string;
    address:        string;
    entrance:       string;
    floor:          string;
    apartment:      string;
    latitude:       number;
    longitude:      number;
    addressType:    number;
    phoneNumber:    string;
    isPrivateHouse: boolean;
    createdAt:      Date;
}


export interface IPromoCategories {
    promoCategories: PromoCategoryElement[];
}

export interface PromoCategoryElement {
    promoCategory: PromoCategoryPromoCategory;
    goods:         Good[];
}

export interface PromoGood {
    id:            string;
    categories:    string[];
    name:          string;
    nameRu:        string;
    nameEn:        string;
    nameUz:        string;
    description:   string;
    descriptionRu: string;
    descriptionEn: string;
    descriptionUz: string;
    photoPath:     string;
    mass:          number;
    volume:        number;
    sellingPrice:  number;
    discount:      number;
    count:         number;
}

export interface PromoCategoryPromoCategory {
    id:       string;
    name:     string;
    nameRu:   string;
    nameEn:   string;
    nameUz:   string;
    imageURL: string;
}


export interface IPromoAdvertisePages {
    promoAdvertisePages: PromoAdvertisePage[];
}

export interface PromoAdvertisePage {
    id:               string;
    badgeColor:       string;
    badgeText:        string;
    badgeTextRu:      string;
    badgeTextEn:      string;
    badgeTextUz:      string;
    titleColor:       string;
    title:            string;
    titleRu:          string;
    titleEn:          string;
    titleUz:          string;
    descriptionColor: string;
    description:      string;
    descriptionRu:    string;
    descriptionEn:    string;
    descriptionUz:    string;
    buttonColor:      string;
    background:       string;
    orderNumber:      number;
    goods:            Good[];
}

export interface PromoAdvertiseGood {
    id:            string;
    categories:    string[];
    name:          string;
    nameRu:        string;
    nameEn:        string;
    nameUz:        string;
    description:   string;
    descriptionRu: string;
    descriptionEn: string;
    descriptionUz: string;
    photoPath:     string;
    mass:          number;
    volume:        number;
    sellingPrice:  number;
    discount:      number;
    count:         number;
}


export interface IPromoAdvertiseResponse {
    promoAdvertises: PromoAdvertise[];
}

export interface PromoAdvertise {
    id:             string;
    wideBackground: string;
    highBackground: string;
    titleColor:     string;
    title:          string;
    titleRu:        string;
    titleEn:        string;
    titleUz:        string;
    orderNumber:    number;
}

