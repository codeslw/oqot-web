"use client"
import {Stack} from "@mui/material";
import {YandexMap} from "@/components/Customs/YandexMap";
import {Input} from "@/components/Input";
import {useEffect, useRef, useState} from "react";
import {useQueryApi} from "@/hooks/useQueryApi";
import {PICKUP_COORDINATES, YANDEX_MAPS_SEARCH_URL} from "@/utils/constants";
import AddressStore, {AddressType} from "@/utils/stores/AddressStore";
import addressStore from "@/utils/stores/AddressStore";
import {Button} from "@/components/Button";
import {useTranslations} from "use-intl";
import {ar} from "date-fns/locale";
import {useMutationApi} from "@/hooks/useMutationApi";
import UIStore from "@/utils/stores/UIStore";
import {useQueryClient} from "@tanstack/react-query";

export const MobileAddressContent = () => {
    const t = useTranslations("General")

    const [isSearching, setIsSearching] = useState(false);
    const [formatedAddress, setFormatedAddress] = useState("");
    const [debounce, setDebounce] = useState("");
    const [anchorElement, setAnchorElement] = useState<any>(null);
    const searchRef = useRef(null);
    const [coords, setCoords] = useState<number[]>([41.33100060277154, 69.28590692396264]);
    const [focusedIndex, setFocusedIndex] = useState(-1);
    const queryClient = useQueryClient()

    const search = useQueryApi(YANDEX_MAPS_SEARCH_URL, {text: formatedAddress}, {
        enabled: !!debounce.length && isSearching
    })

    const createAddress = useMutationApi("/addresstoclient", "post", {})

    const handleAddressChange = (value: string, isSearching: boolean, target?: any) => {
        if (!isSearching) {
            setFormatedAddress(value);
            setIsSearching(false)
        } else {
            setIsSearching(true)
            setFormatedAddress(value)
            setAnchorElement(target)

        }
    }
    useEffect(() => {
        let interval: any;
        if (isSearching) {
            interval = setTimeout(() => {
                setDebounce(formatedAddress)
            }, 500)
        }
        return () => {
            if (interval) {
                clearTimeout(interval)
            }
        }
    }, [formatedAddress, isSearching]);

    const handlePickAddressFromSearch = (coords: number[]) => {
        setCoords(coords);
    }

    const handlePickAddressFromMap = (coords: number[]) => {
        if(addressStore.addressType === "Pickup" && !(coords[0] === PICKUP_COORDINATES[0] && coords[1] === PICKUP_COORDINATES[1])) {
            addressStore.setAddressType("Delivery")
        }
        setCoords(coords);
        setIsSearching(false);
    }

    const handlePickStoreAddress = (coords : number[]) => {
        setCoords(coords)
        setIsSearching(false)
    }

    const handleChooseAddressType = (type : AddressType) => {
        if (type === 'Delivery' && addressStore.addressType !== "Delivery") {
            addressStore.setAddressType('Delivery');

        }
        else  {
            addressStore.setAddressType('Pickup')
            handlePickStoreAddress(PICKUP_COORDINATES)
        }
    }

    const handleSaveAddress = async () => {
        try {
            const  payload = {
                "address": formatedAddress,
                "latitude": coords[0],
                "longitude": coords[1],
                "isPrivateHouse": false,
                "addressType": addressStore.addressType === "Delivery" ? 0 : 1,
                "entrance": "",
                "floor": "",
                "apartment": "",
                "phoneNumber": ""
            }
            const response : any = await createAddress.mutateAsync(payload)

            if (response.status < 400) {
                UIStore.closeMobileAddressPopup()
                UIStore.setOpenedMobileAddressList(true)
                queryClient.invalidateQueries(["/addresstoclient"])
                //   const lastAddress : any = (queryClient.getQueryData(['/addresstoclient']) as any)?.data?.addressToClients?.find((item : any) => item.id === response.data);
                //  console.log(lastAddress, "lastAddress")
                AddressStore.setActiveAddress({id: response.data, clientID : "", createdAt : new Date(), ...payload})

                // if(onOpenAddressList){
                //     onOpenAddressList()
                // }
            }
        }
        catch (err) {

        }
    }

    return (
        <Stack gap={2} className={`pb-5`}>
            <div className={`w-screen h-80`}>
                <YandexMap
                    coords={coords}
                    handlePickAddressFromSearch={handlePickAddressFromSearch}
                    handlePickAddressFromMap={handlePickAddressFromMap}
                    handleAddressChange={handleAddressChange}
                />
            </div>
            <Stack direction={"row"} gap={1} className={`px-4`}>
                <div
                    onClick={() => handleChooseAddressType("Pickup")}
                    className={`w-full flex justify-between items-center px-3 py-2 h-10 rounded-xl border  ${addressStore.addressType === "Pickup"  ? "border-orange-default" : "border-gray-focus"}`}>
                    <div className="text-base-bold dark:text-black-primary">
                        {"Самовывоз"}
                    </div>
                </div>
                <div
                    onClick={() => handleChooseAddressType("Delivery")}
                    className={`w-full flex justify-between items-center px-3 py-2 h-10 rounded-xl border ${addressStore.addressType === "Delivery"  ? "border-orange-default" : "border-gray-focus"} `}>
                    <div className="text-base-bold dark:text-black-primary">
                        {"Доставка"}
                    </div>
                    <div className={`text-xs dark:text-black-primary`}>
                        {"15000 cум"}
                    </div>
                </div>
            </Stack>
            <div className={`px-4`}>
                <Input
                    value={formatedAddress}
                    onChange={(e) => handleAddressChange(e.target.value, true, e.currentTarget)}
                    placeholder={"Адрес доставки"} errorMessage={""} lightBackground variant={"filled"}/>
            </div>
            {(search?.data?.data?.features?.length > 0 && isSearching) && <div
                className={`rounded-2xl bg-white absolute z-50 bottom-[75px] left-4 shadow-lg !max-h-[25rem] overflow-y-auto overflow-x-hidden`}>
                <ul id={"locations-list"} className={`p-4`}
                    style={{width: `${anchorElement?.clientWidth ?? 100}px`}}>
                    {search?.data?.data?.features?.map(({
                                                            properties,
                                                            geometry
                                                        }: any, idx: number) => (
                        <li
                            onClick={() => handlePickAddressFromMap(geometry?.coordinates?.reverse())}
                            className={`${focusedIndex === idx ? 'bg-gray-background' : ''} w-full flex flex-col space-y-0 hover:bg-gray-background rounded-2xl px-3 py-2 cursor-pointer`}
                            key={properties.description}>
                            <div className="text-base-bold">
                                {properties.name}
                            </div>
                            <div className="text-xs-light-gray">
                                {properties.description}
                            </div>
                        </li>
                    ))}
                </ul>
            </div>}
            <div className={"px-4 w-full"}>
                <Button
                    onClick={handleSaveAddress}
                    loading={createAddress.isLoading}
                    disabled={createAddress.isLoading}
                    theme={"primary"} fullWidth text={t("Save")} className={'!w-full'}/>
            </div>
        </Stack>
    );
};
