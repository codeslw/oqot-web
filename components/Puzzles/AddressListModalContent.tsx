import {Modal} from "@/components/Modal";
import {Stack} from "@mui/material";
import {useQueryApi} from "@/hooks/useQueryApi";
import {useTranslations} from "use-intl";
import {AxiosResponse} from "axios";
import {IAddressToClientData} from "@/types/common";
import XIcon from "@/public/icons/x.svg"
import {Button} from "@/components/Button";
import PlusIcon from "@/public/icons/plus.svg";
import CircleIcon from "@/public/icons/circle.svg"
import {observer} from "mobx-react-lite";
import AddressStore from "@/utils/stores/AddressStore";
import {Empty} from "@/components/Shared/Empty";
import UIStore from "@/utils/stores/UIStore";
import {useQueryClient} from "@tanstack/react-query";
import {useMutationApi, useMutationApiAdvanced} from "@/hooks/useMutationApi";

interface IAddressListModalContent {
    open: boolean,
    onClose: () => void
}

export const AddressListModalContent : React.FC<IAddressListModalContent> = observer(({open, onClose}) => {
    const t = useTranslations("CreateOrder");
    const addressList = useQueryApi<AxiosResponse<IAddressToClientData>>("/addresstoclient", {} , {
        refetchOnMount : true,
    });
    const deleteAddress = useMutationApiAdvanced("/addresstoclient", "delete", {})

    const handleStartAddAddress = () => {
        UIStore.setIsPickAddressModalOpen(true);
        onClose();
    }

    const handleDelete = async (e : React.MouseEvent<HTMLDivElement>, id : string) => {
        e.stopPropagation()
        try {
            const response = await deleteAddress.mutateAsync({
                slug : `/${id}`
            });
            if (response.status < 400) {
                addressList.refetch()
            }
        }
        catch (e) {
            console.log("Something went wrong")
        }
    }

    return <Modal onCloseIconClicked={onClose} onClose={onClose} open={open}>
        <Stack spacing={3}>
            <div className="text-3xl-bold">
                {t('My addresses')}
            </div>

            {addressList?.data?.data?.addressToClients?.length ? <Stack spacing={0} className={"max-h-[30rem] overflow-y-auto"}>
                {addressList?.data?.data?.addressToClients?.map((item, index) => {
                    return (
                        <div onClick={() => {
                            AddressStore.setActiveAddress(item)
                        }} className={"w-full px-3 py-4 flex justify-between space-x-4 items-center cursor-pointer"}>
                            <div className="flex space-x-4 items-center">
                                <CircleIcon
                                    className={`fill-gray-secondary ${AddressStore.activeAddress?.id === item.id ? "fill-orange-default stroke-1" : ""}`}/>
                                <Stack spacing={0}>
                                    <div className="text-base-bold">
                                        {item.address}
                                    </div>
                                    <div className="text-xs-light-gray">
                                        {item.addressType === 0 ? (item.apartment ? `${t("Apartment")} ${item.apartment}` : t("Tashkent")) : t("Pickup point")}
                                    </div>
                                </Stack>
                            </div>
                            <div onClick={(e) =>  handleDelete(e, item.id)}>
                                <XIcon  className={"fill-gray-primary"}/>
                            </div>
                        </div>
                    )
                })}
            </Stack> : <Empty title={t("No addresses found")} message={t('No addresses found_text')}/>}
            <Button onClick={handleStartAddAddress} theme={"primary"} text={t("Add Address")} startIcon={<PlusIcon className={"fill-black-primary"}/>}/>
        </Stack>
    </Modal>
})