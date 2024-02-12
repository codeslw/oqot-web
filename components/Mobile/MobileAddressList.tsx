import {useQueryApi} from "@/hooks/useQueryApi";
import {Stack} from "@mui/material";
import CircleOutlinedIcon from "@/public/icons/circle.svg";
import CircleFilledIcon from "@/public/icons/circle-checked.svg";
import AddressStore from "@/utils/stores/AddressStore";
import XIcon from "@/public/icons/x.svg";
import PlusIcon from "@/public/icons/plus.svg";
import {useTranslations} from "use-intl";
import UIStore from "@/utils/stores/UIStore";
import {Empty} from "@/components/Shared/Empty";
import {useMutationApiAdvanced} from "@/hooks/useMutationApi";
import {observable} from "mobx";
import {observer} from "mobx-react-lite";

export const MobileAddressList = observer(() => {

    const t = useTranslations("General")
    const addressList = useQueryApi("/addresstoclient", {}, {
        select : (data) => data.data.addressToClients
    });

    const deleteAddress = useMutationApiAdvanced("/addresstoclient", "delete", {
        onSuccess : () => {
            addressList.refetch()
        }
    });


    const handleDeleteAddress = (addressId : string) => {
        deleteAddress.mutate({
            slug : `/${addressId}`
        })
    }




    const {activeAddress, setActiveAddress} = AddressStore;

    return <div className={"flex flex-col space-y-2 px-4"}>
        {addressList?.isLoading ? <div>...Loading</div> :
            addressList?.data?.length === 0 ? <Empty
                    message={t("Address list is empty_text")}
                    title={t("Address list is empty")}/> :
            addressList.data?.map((address : any) => {
            return <div className={"w-full flex space-x-4 items-center py-3"}>
                <div
                onClick={() => AddressStore.setActiveAddress(address)}
                >
                    {
                        activeAddress?.id === address.id ? <CircleFilledIcon/>
                            : <CircleOutlinedIcon className={"fill-gray-secondary"}/>
                    }
                </div>
                <div className="text-base-bold grow flex flex-col space-y-2">
                    <span>
                    {address.address}
                    </span>
                    <span className="text-xs-light-gray">
                        {(address.apartment ? `${t("apartment")} ${address.apartment}` : undefined) ?? t("Tashkent")}
                    </span>
                </div>
                <div
                onClick={() => handleDeleteAddress(address.id)}
                >
                    <XIcon className={"fill-gray-secondary"}/>
                </div>
            </div>
        })}
        <div className="flex space-x-4 py-3">
            <PlusIcon className={"fill-gray-secondary"}/>
            <div onClick={() => {
                UIStore.openMobileAddressPopup()
                UIStore.setOpenedMobileAddressList(false)
            }} className="text-base-bold">
                {t("Add Address")}
            </div>
        </div>
    </div>
})