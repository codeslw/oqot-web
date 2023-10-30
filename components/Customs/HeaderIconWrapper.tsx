import {ReactNode} from "react";

interface IHeaderIconWrapper {
    children : ReactNode
}

export const HeaderIconWrapper:React.FC<IHeaderIconWrapper> = ({children}) => {
    return (
        <div className="w-12 h-12 relative flex justify-center items-center cursor-pointer">
            {children}
        </div>
        );
};
