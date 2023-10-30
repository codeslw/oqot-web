export interface IPromoCategoryGoods {
    promoCategories: PromoCategoryElement[];
}

export interface PromoCategoryElement {
    promoCategory: PromoCategory;
    goods:         IGood[];
}

export interface IGood {
    id:             string;
    name:           string;
    nameRu:         string;
    nameEn:         string;
    nameUz:         string;
    description:    string;
    descriptionRu:  string;
    descriptionEn:  string;
    descriptionUz:  string;
    noteRu:         string;
    noteEn:         string;
    noteUz:         string;
    photoPath:      string;
    purchasePrice:  number;
    sellingPrice:   number;
    minQuantity:    number;
    discount:       number;
    volume:         number;
    mass:           number;
    unitRu:         string;
    unitUz:         string;
    unitEn:         string;
    providerID:     string;
    providerName:   string;
    count:          number;
    soldCount:      number;
    categories:     any;
    createdAt:      Date;
    codeIkpu:       string;
    saleTaxPercent: number;
    packageCode:    string;
    isVerified:     boolean;
}


interface IGoodByIdResponse {
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
}

export interface PromoCategory {
    id:       string;
    nameRu:   string;
    nameEn:   string;
    nameUz:   string;
    imageURL: string;
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


export interface IRecommended {
    goods: [
        {
            id: string,
            categories: string[],
            name: string,
            nameRu: string,
            nameEn: string,
            nameUz: string,
            description: string,
            descriptionRu: string,
            descriptionEn: string,
            descriptionUz: string,
            photoPath: string,
            mass: number,
            volume: number,
            sellingPrice: number,
            discount: number,
            count: number
        }
    ]
}

export interface  ISubCategoriesByCategoryResponse {
    categories: [
        {
            id: string,
            isMainCategory: true,
            name: string,
            nameRu: string,
            nameEn: string,
            nameUz: string,
            goodsCount: number,
            goods: {
                    id: string,
                    name: string,
                    nameRu: string,
                    nameEn: string,
                    nameUz: string,
                    photoPath: string,
                    sellingPrice: number,
                    discount: number,
                    count: number
                }[]

        }
    ]
}