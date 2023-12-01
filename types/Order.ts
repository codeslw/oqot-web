export interface ICalculatePricePayload {
    "toLatitude": number,
    "toLongitude": number,
    "isPickup": boolean,
    "promo": string,
    "goodToOrders": {
        "goodId": number | string,
        "count": number
    }[]


}
export interface ICalculatePriceResponse {
    "shippingPrice": number,
    "sellingPrice": number,
    "sellingPriceDiscount": number,
    "shippingPriceDiscount": number,
    "totalPrice": number
}


export interface ICreateOrder {
    comment:               string;
    dontCallWhenDelivered: boolean;
    apartment:             string;
    floor:                 string;
    entrance:              string;
    address:               string;
    toLongitude:           number;
    toLatitude:            number;
    isPickup:              boolean;
    paymentType:           number;
    promo:                 string;
    deliverAt:             string | null;
    goodToOrders:          GoodToOrder[];
}

export interface GoodToOrder {
    goodId: string;
    count:  number;
}

export interface IGoodToOrder {

    "id": string,
    "goodId": string,
    "goodName": string,
    "goodImagePath": string,
    "goodSellingPrice": number,
    "goodDiscount": number,
    "count": number

}