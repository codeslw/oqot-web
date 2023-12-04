import {ReactNode} from "react";
import addressStore from "@/utils/stores/AddressStore";
import UIStore from "@/utils/stores/UIStore";
import {observer} from "mobx-react-lite";
import {AddressListModalContent} from "@/components/Puzzles/AddressListModalContent";

interface  IWithModalsWrapper {
    children : ReactNode
}
const WithModalsWrapper : React.FC<IWithModalsWrapper> = observer(({children}) => {
    return <>
        {children}
        <AddressListModalContent open={UIStore.isAddressListOpen} onClose={() => UIStore.setIsAddressListOpen(false)}/>
    </>
})