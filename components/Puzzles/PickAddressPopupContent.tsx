"use client"
import CircleCheckedIcon from "@/public/icons/circle-checked.svg";
import XIcon from "@/public/icons/x.svg";
import CircleIcon from "@/public/icons/circle.svg";
import PlusIcon from "@/public/icons/plus.svg"
import React, {useState} from "react";
import {returnStatement} from "@babel/types";
import uistore from "@/utils/stores/UIStore"
import addressStore from "@/utils/stores/AddressStore";
import {AddressToClient} from "@/types/common";
import {observer} from "mobx-react-lite";
import {useMutationApi, useMutationApiAdvanced} from "@/hooks/useMutationApi";
import {ADDRESS_LIST_URL, DELETE_ADDRESS_URL} from "@/utils/constants";
import {useQueryClient} from "@tanstack/react-query";
import {ConfirmModal} from "@/components/Shared/ConfirmModal";
import {useTranslations} from "use-intl";
import UIStore from "@/utils/stores/UIStore";


interface PickAddressPopupContent {
    addresses : AddressToClient[] | [],
    pickedAddressId : string,
    onClose : () => void

}

interface Address {
    name : string,
    id : string,
    isPickup : boolean,
    apartment : string,
}

export const PickAddressPopupContent: React.FC<PickAddressPopupContent> = observer(({addresses, pickedAddressId, onClose}) => {

    const deleteAddress = useMutationApiAdvanced(DELETE_ADDRESS_URL, "delete", {});
    const queryClient = useQueryClient();
    const [confirmModal, setConfirmModal] = useState(false);
    const [deleteAddressId, setDeleteAddressId] = useState("");
    const t = useTranslations("Address")
    const handleAddNewAddress = () => {
        onClose();
        UIStore.closeMobileAddressPopup()
        UIStore.setIsPickAddressModalOpen(true)

    }

    const handleDeleteAddress = async (id : string) => {
        try {
            const response = await  deleteAddress.mutateAsync({
                slug : `/${id}`
            })
            if(response.status < 400) {
                queryClient.invalidateQueries({
                    queryKey : [ADDRESS_LIST_URL]
                });
                setDeleteAddressId("")
                setConfirmModal(false);
            }
        }
        catch (error) {

        }
    }

    const handleStartDeleteAddress = (id : string) => {
        console.log(id, " clicked delete")
        setDeleteAddressId(id)
        setConfirmModal(true)
    }


    const handleCloseConfirmModal = () => {
        setDeleteAddressId("");
        setConfirmModal(false)
    }

    const handleStartAddAddress = () => {

    }


    return (
        <div className={"flex flex-col space-y-1 max-w-[22.5rem]"}>
            <div className="text-xl-bold px-4 py-3 dark:text-black-primary">
                {"Мои адреса"}
            </div>
            {addresses.map((address) => {
                return (
                    <div
                        onClick={() => addressStore.setActiveAddress(address)}
                        className="p-4 flex space-x-4 items-center rounded-xl cursor-pointer hover:bg-gray-background">
                        {addressStore.activeAddress?.id ===  address.id ?  <CircleCheckedIcon className={"min-w-max"}/>
                            : <CircleIcon className={"min-w-max fill-gray-default"}/>}
                        <div className="flex flex-col space-y-0 grow max-w-[250px]">
                            <div className="text-base-bold dark:text-black-primary">{address.address}</div>
                            <div className="text-xs-light-gray ">{address.apartment ? `Квартира ${address.apartment}` : address.addressType === 1 ? `Самовывоз` : `Ташкент`}</div>
                        </div>
                        <div
                            onClick={(e) => {
                                e.stopPropagation();
                                handleStartDeleteAddress(address.id)
                            }}
                        >
                            <XIcon
                                className ="ml-auto fill-gray-secondary dark:fill-gray-secondary-dark !min-w-6 !min-h-6"/>
                        </div>
                    </div>
                )
            })}
            <div onClick={handleAddNewAddress} className={`p-4 space-x-4 flex items-center cursor-pointer rounded-xl hover:bg-gray-background`}>
                <PlusIcon className = {"fill-black-primary dark:fill-black-primary"}/>
                <div className={`text-base-bold dark:text-black-primary`}>
                    {"Другой адрес доставки"}
                </div>
            </div>
            <ConfirmModal open={confirmModal}
                          onClose={handleCloseConfirmModal}
                          title={t("Are you sure to delete Address")} message={t("After confirm address will be deleted from the list of addresses")}
                          onConfirm={() => handleDeleteAddress(deleteAddressId)}
                          onCancel={handleCloseConfirmModal}/>
        </div>
    );
});
