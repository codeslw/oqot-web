"use client"
import React, {ReactNode} from "react";

interface IHeaderIconWrapper {
    children : ReactNode,
    onClick? : (e : React.MouseEvent<HTMLDivElement>) => void
}

export const HeaderIconWrapper:React.FC<IHeaderIconWrapper> = ({children, onClick}) => {
    return (
        <div
            onClick={onClick}
            className="w-12 h-12 relative flex justify-center items-center cursor-pointer">
            {children}
        </div>
        );
};
