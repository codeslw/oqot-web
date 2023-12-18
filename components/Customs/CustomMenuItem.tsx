"use client"
import React, {DetailedHTMLProps, HTMLAttributes, ReactNode} from "react";
import Link from "next/link";

interface IMenuItem extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>{
    children : ReactNode,
    onClick?: () => void,
    link?: string
}

export const CustomMenuItem:React.FC<IMenuItem> = ({children, onClick, link,...rest}) => {
    return ( link ? <Link href={link}
                          onClick={() => onClick ? onClick() : null}
                          className={"py-3 pl-3 pr-1 flex items-center justify-between cursor-pointer hover:bg-gray-background rounded-xl"}>
                {children}
            </Link> :
        <div {...rest} className={"py-3 pl-3 pr-1 flex items-center justify-between cursor-pointer hover:bg-gray-background rounded-xl"}>
            {children}
        </div>
    );
};
