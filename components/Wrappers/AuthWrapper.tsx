'use client'
import {Authentication} from "@/components/Contents/Authentication";
import {useAuth} from "@/hooks/useAuth";

interface  IAuthWrapper {
    children : React.ReactNode
}

export const AuthWrapper : React.FC<IAuthWrapper> = ({children}) => {

    const {isUserAuthenticated} = useAuth()

    return <>
        {isUserAuthenticated === false  && <Authentication/>}
        {children}
    </>

}