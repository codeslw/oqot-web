'use client'
import {Authentication} from "@/components/Contents/Authentication";
import {useAuth} from "@/hooks/useAuth";
import AuthStore from "@/utils/stores/AuthStore";
import {observer} from "mobx-react-lite";

interface  IAuthWrapper {
    children : React.ReactNode
}

export const AuthWrapper : React.FC<IAuthWrapper> = observer(({children}) => {

    console.log(AuthStore.isUserAuthenticated, " isUserAuthenticated");

    return <>
        {AuthStore.isUserAuthenticated === false  && <Authentication/>}
        {children}
    </>

})