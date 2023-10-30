import {format} from "date-fns";
import {AddressToClient} from "@/types/common";
import AddressStore from "@/utils/stores/AddressStore";

export const formatPrice = (price : number) => {
    return price.toLocaleString("en-US", {
        maximumFractionDigits : 0, minimumFractionDigits : 0
    }).replace(/,/g , " ")
}

export const formatDate = (date : Date) => {
    return format(date, "dd.MM.yyyy")
}

export const getAddressDetailsText = (address : AddressToClient | null, t : any) => (address?.addressType === 1 ? t("Pickup point")
        : address?.apartment ? `${t("Apartment")} ${address?.apartment}`
            :  t("Tashkent"))