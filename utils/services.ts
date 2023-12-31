import {format} from "date-fns";
import  {ru} from "date-fns/locale";
import {AddressToClient} from "@/types/common";
import AddressStore from "@/utils/stores/AddressStore";
import {useLocale} from "use-intl";

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


export const formatCardNumber = (cardNumber : string) => {
    return cardNumber.replace(/\s/g, "");
}

export const formatExpireDate = (expireDate : string) => {
    return `${expireDate.split("/")[1]}${expireDate.split("/")[0]}`
}


export const formatDateOrder = (date : Date) => {

        return format(date, 'dd MMMM, HH:mm', { locale: ru })

}


export const  formatPhoneNumber = (phoneNumber : string)  => {
    // Use a regular expression to capture groups in the phone number
    // Remove non-numeric characters from the input
    const numericOnly = phoneNumber.replace(/\D/g, '');

    // Use a regular expression to capture groups in the numeric phone number
    const regex = /^(\d{3})(\d{2})(\d{3})(\d{2})(\d{2})$/;

    // Apply the regular expression to the numeric phone number
    const matches = numericOnly.match(regex);

    if (matches) {
        // Format the phone number using the captured groups
        const formattedNumber = `+${matches[1]} ${matches[2]} ${matches[3]}-${matches[4]}-${matches[5]}`;
        return formattedNumber;
    } else {
        // Return the original phone number if it doesn't match the expected pattern
        return phoneNumber;
    }
}


export  const  localize = (name : string) => {
    const locale = useLocale();
    return `${name} ${locale.charAt(0).toUpperCase() + locale.charAt(1)}`;
}

export const subString = (str : string | undefined, length : number) => !str ? undefined :   str.length > length ? str.substring(0, length - 2) + '...' : str;