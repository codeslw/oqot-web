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

interface IAddressListModalContent {
    open: boolean,
    onClose: () => void
}

export const AddressListModalContent : React.FC<IAddressListModalContent> = observer(({open, onClose}) => {
    const t = useTranslations("CreateOrder");
    const addressList = useQueryApi<AxiosResponse<IAddressToClientData>>("/addresstoclient", {} , {});


    return <Modal onCloseIconClicked={onClose} onClose={onClose} open={open}>
        <Stack spacing={3}>
            <div className="text-3xl-bold">
                {t('My addresses')}
            </div>
            <Stack spacing={0}>
                {addressList?.data?.data?.addressToClients?.map((item, index) => {
                    return (
                        <div onClick={() => {
                            AddressStore.setActiveAddress(item)
                        }} className={"w-full px-3 py-4 flex justify-between space-x-4 items-center cursor-pointer"}>
                            <div className="flex space-x-4 items-center">
                                <CircleIcon className={`fill-gray-secondary ${AddressStore.activeAddress?.id === item.id ? "fill-orange-default stroke-1" :""}`}/>
                                <Stack spacing={0}>
                                    <div className="text-base-bold">
                                        {item.address}
                                    </div>
                                    <div className="text-xs-light-gray">
                                        {item.addressType === 0 ?  (item.apartment ?`${t("Apartment")} ${item.apartment}` : t("Tashkent")) : t("Pickup point")}
                                    </div>
                                </Stack>
                            </div>
                            <XIcon className={"fill-gray-primary"}/>
                        </div>
                    )
                })}
            </Stack>
            <Button theme={"primary"} text={t("Add Address")} startIcon={<PlusIcon className={"fill-black-primary"}/>}/>
        </Stack>
    </Modal>
})