"use client"
import {Stack} from "@mui/material";
import {YandexMap} from "@/components/Customs/YandexMap";
import {Input} from "@/components/Input";
import {useEffect, useRef, useState} from "react";
import {useQueryApi} from "@/hooks/useQueryApi";
import {YANDEX_MAPS_SEARCH_URL} from "@/utils/constants";

export const MobileAddressContent = () => {

    const [isSearching, setIsSearching] = useState(false);
    const [formatedAddress, setFormatedAddress] = useState("");
    const [debounce, setDebounce] = useState("");
    const [anchorElement, setAnchorElement] = useState<any>(null);
    const searchRef = useRef(null);
    const [coords, setCoords] = useState<number[]>([41.33100060277154, 69.28590692396264]);
    const [focusedIndex, setFocusedIndex] = useState(-1);
    const search = useQueryApi(YANDEX_MAPS_SEARCH_URL, {text: formatedAddress}, {
        enabled: !!debounce.length && isSearching
    })
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
        setCoords(coords);
        setIsSearching(false);
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
                <div className="w-full flex justify-between items-center px-3 py-2 h-10 rounded-xl border border-gray-focus">
                    <div className="text-base-bold dark:text-black-primary">
                        {"Самовывоз"}
                    </div>
                </div>
                <div className="w-full flex justify-between items-center px-3 py-2 h-10 rounded-xl border border-gray-focus">
                    <div className="text-base-bold dark:text-black-primary">
                    {"Доставка"}
                    </div>
                    <div className="text-xs dark:text-black-primary">
                        {"15000 cум"}
                    </div>
                </div>
            </Stack>
            <div className={`px-4`}>
                <Input placeholder={"Адрес доставки"} errorMessage={""} lightBackground variant={"filled"}/>
            </div>
        </Stack>
    );
};
