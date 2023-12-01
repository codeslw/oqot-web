import {Stack} from "@mui/material";
import {Input} from "@/components/Input";
import {Button} from "@/components/Button";
import {YandexMap} from "@/components/Customs/YandexMap";
import {useTranslations} from "use-intl";
import {useForm} from "react-hook-form";
import {useEffect, useRef, useState} from "react";
import {useQueryApi} from "@/hooks/useQueryApi";
import {PICKUP_COORDINATES, YANDEX_MAPS_SEARCH_URL} from "@/utils/constants";
import {Menu} from "@/components/Menu";
import AddressStore, {AddressType} from "@/utils/stores/AddressStore";
import {observer} from "mobx-react-lite";
import {useMutationApi} from "@/hooks/useMutationApi";


interface  IAddressModalContent {
    onClose : () => void;
    onOpenAddressList? : () => void;
}

export const AddressModalContent : React.FC<IAddressModalContent> = observer(({onClose, onOpenAddressList}) => {

    const t = useTranslations("Address");

    const [isSearching, setIsSearching] = useState(false);
    const [formatedAddress, setFormatedAddress] = useState("");
    const [debounce, setDebounce] = useState("");
    const [anchorElement, setAnchorElement] = useState<any>(null);
    const searchRef = useRef(null);
    const [coords, setCoords] = useState<number[]>([41.33100060277154, 69.28590692396264]);
    const [focusedIndex, setFocusedIndex] = useState(-1);
    const {addressType, setAddressType} = AddressStore;
    const search = useQueryApi(YANDEX_MAPS_SEARCH_URL, {text: formatedAddress}, {
        enabled: !!debounce.length && isSearching
    })

    //MUTATIONS

    const createAddress = useMutationApi("/addresstoclient", "post", {})

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



    //HANDLERS START
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

    const handlePickAddressFromSearch = (coords: number[]) => {
        setCoords(coords);
    }

    const handlePickAddressFromMap = (coords: number[]) => {
        setCoords(coords);
        setIsSearching(false);
        
    }

    const handleSearchKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === "ArrowUp") {
            event.preventDefault();
            setFocusedIndex((prevIndex) => (prevIndex > 0 ? prevIndex - 1 : search?.data?.data?.features?.length - 1));
        } else if (event.key === "ArrowDown") {
            event.preventDefault();
            setFocusedIndex((prevIndex) => (prevIndex < search?.data?.data?.features?.length - 1 ? prevIndex + 1 : 0));
        } else if (event.key === "Enter" && focusedIndex !== -1) {
            handleLocationKeyDown(
                search?.data?.data?.features?.[focusedIndex]?.properties?.name,
                search?.data?.data?.features?.[focusedIndex]?.geometry?.coordinates.reverse()
            )
        }

    }

    const handleLocationKeyDown = (name: string, coords: number[]) => {
        setFormatedAddress(name);
        setIsSearching(false);
        handlePickAddressFromMap(coords);

    }


    const handleChooseAddressType = (type : AddressType) => {
        if (type === 'Delivery') {
            setAddressType('Delivery');
        }
        else  {
            setAddressType('Pickup')
            handlePickAddressFromMap(PICKUP_COORDINATES)
        }
    }


    const handleAddAddress = async () => {
        try {
            const response = await createAddress.mutateAsync({
                "address": formatedAddress,
                "latitude": coords[0],
                "longitude": coords[1],
                "isPrivateHouse": false,
                "addressType": addressType === "Delivery" ? 0 : 1,
                "entrance": "",
                "floor": "",
                "apartment": "",
                "phoneNumber": ""
            })

            if (response.status < 400) {
                onClose()
                if(onOpenAddressList){
                    onOpenAddressList()
                }
            }
        }
        catch (err) {

        }
    }

    //HANDLERS END


    return (
        <Stack spacing={3}>
            <Stack direction={"column"} spacing={2}>
                <div className="text-3xl-bold dark:text-black-primary">
                    {"Выберите адрес доставки"}
                </div>
                <div className="text-base-light-gray">
                    {"От этого зависит ассортимент"}
                </div>
            </Stack>
            <Stack gap={2} direction={["column", "row"]}>
                <div
                    onClick={() => handleChooseAddressType('Delivery')}
                    className={`w-1/2 flex justify-between px-3  md:px-6 py-4 rounded-2xl border cursor-pointer
                    ${addressType === "Pickup" ? 'border-gray-secondary hover:border transition-all duration-300 cursor-pointer hover:border-orange-focus' : 'border-orange-default border-[2px]'}`}>
                    <div className="text-base-bold dark:text-black-primary">{'Доставка'}</div>
                    <div className="text-base-light-gray">{'От 25 000 сум'}</div>
                </div>
                <div
                    onClick={() => handleChooseAddressType('Pickup')}
                    className={`w-1/2 flex justify-between px-3  md:px-6 py-4 rounded-2xl border cursor-pointer
                     ${addressType === "Delivery" ? 'border-gray-secondary hover:border-[2px] hover:border-orange-default' : 'border-orange-default border-[2px]'}`}>
                    <div className="text-base-bold dark:text-black-primary">{'Самовывоз'}</div>
                    <div className="text-base-light-gray">{'Бесплатно'}</div>
                </div>
            </Stack>
            <Stack direction={"row"} spacing={2} className={'relative'}>
                <Input errorMessage={""}
                       lightBackground
                       variant={"filled"}
                       onChange={(e) => handleAddressChange(e.target.value, true, e.currentTarget)}
                       value={formatedAddress}
                       onKeyDown={handleSearchKeyPress}
                       aria-describedby={"location-search"}
                       ref={searchRef}
                       inputClasses={"flex grow dark:text-black-primary dark:bg-gray-background"}
                       placeholder={"Введите адрес, чтобы найти ближайшие пункты самовывоза"}/>
                {(search?.data?.data?.features?.length > 0 && isSearching) && <div
                    className={`rounded-2xl bg-white absolute z-50 top-16 -left-4 shadow-lg !max-h-[25rem] overflow-y-auto overflow-x-hidden`}>
                    <ul id={"locations-list"} className={`p-4`}
                        style={{width: `${anchorElement?.clientWidth ?? 100}px`}}>
                        {search?.data?.data?.features?.map(({properties, geometry}: any, idx: number) => (
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

                <Button onClick={handleAddAddress}
                        theme={"primary"} text={"Заберу отсюда"}
                        disabled={!formatedAddress || !coords.length}/>
            </Stack>
            <div
                className="sm:w-[450px] md:w-[550px] lg:w-[700px] xl:w-[860px] aspect-[86/37] rounded-3xl bg-gray-background overflow-hidden">
                <YandexMap handleAddressChange={handleAddressChange}
                           coords={coords}
                           handlePickAddressFromSearch={handlePickAddressFromSearch}
                           handlePickAddressFromMap={handlePickAddressFromMap}
                />
            </div>
        </Stack>

    );
});
