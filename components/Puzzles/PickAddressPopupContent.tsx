import CircleCheckedIcon from "@/public/icons/circle-checked.svg";
import XIcon from "@/public/icons/x.svg";
import CircleIcon from "@/public/icons/circle.svg";
import PlusIcon from "@/public/icons/plus.svg"
import React from "react";
import {returnStatement} from "@babel/types";
import uistore from "@/utils/stores/UIStore"


interface PickAddressPopupContent {
    addresses : Address[] | [],
    pickedAddressId : string,
    onClose : () => void

}

interface Address {
    name : string,
    id : string,
    isPickup : boolean,
    apartment : string
}

export const PickAddressPopupContent: React.FC<PickAddressPopupContent> = ({addresses, pickedAddressId, onClose}) => {

    const handleAddNewAddress = () => {
        onClose();
        uistore.closeMobileAddressPopup()
    }

    return (
        <div className={"flex flex-col space-y-1 max-w-[22.5rem]"}>
            <div className="text-xl-bold px-4 py-3 dark:text-black-primary">
                {"Мои адреса"}
            </div>
            {addresses.map((address) => {
                return (
                    <div className="p-4 flex space-x-4 items-center rounded-xl cursor-pointer hover:bg-gray-background">
                        {pickedAddressId === address.id ?  <CircleCheckedIcon className={"min-w-max"}/>
                            : <CircleIcon className={"min-w-max fill-gray-default"}/>}
                        <div className="flex flex-col space-y-0 grow ">
                            <div className="text-base-bold dark:text-black-primary">{address.name}</div>
                            <div className="text-xs-light-gray ">{address.apartment ? `Квартира ${address.apartment}` : address.isPickup ? `Самовывоз` : `Ташкент`}</div>
                        </div>
                        <XIcon className ="ml-auto fill-gray-secondary dark:fill-gray-secondary-dark"/>
                    </div>
                )
            })}
            <div onClick={handleAddNewAddress} className={`p-4 space-x-4 flex items-center cursor-pointer rounded-xl hover:bg-gray-background`}>
                <PlusIcon className = {"fill-black-primary dark:fill-black-primary"}/>
                <div className={`text-base-bold dark:text-black-primary`}>
                    {"Другой адрес доставки"}
                </div>
            </div>
        </div>
    );
};
