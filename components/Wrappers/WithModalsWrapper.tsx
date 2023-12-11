"use client"
import {ReactNode} from "react";
import addressStore from "@/utils/stores/AddressStore";
import UIStore from "@/utils/stores/UIStore";
import {observer} from "mobx-react-lite";
import {AddressListModalContent} from "@/components/Puzzles/AddressListModalContent";
import {usePathname, useRouter, useSearchParams} from "next/navigation";
import {ProductContent} from "@/components/Contents/ProductContent";
import {useQueryParams} from "@/hooks/useQueryParams";

interface  IWithModalsWrapper {
    children : ReactNode
}
export const WithModalsWrapper : React.FC<IWithModalsWrapper> = observer(({children}) => {

    const queryParams = useSearchParams();
    const goodId  = queryParams.get("goodId");
    const router = useRouter();
    const pathname = usePathname();
    const {createQueryString, deleteQueryParam} = useQueryParams()

    return <>
        {children}
         <ProductContent open={!!goodId} onClose={() => router.push(`${pathname}?${deleteQueryParam("goodId")}`)} goodId={goodId ?? ""}/>
        {/*<AddressListModalContent open={UIStore.isAddressListOpen} onClose={() => UIStore.setIsAddressListOpen(false)}/>*/}
    </>
})