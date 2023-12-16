import React, {DetailedHTMLProps, HTMLAttributes, ReactNode} from "react";
import Link from "next/link";

interface IMenuItem extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>{
    children : ReactNode,
    link?: string
}

export const CustomMenuItem:React.FC<IMenuItem> = ({children,link,...rest}) => {
    return ( link ? <Link href={link} className={"py-3 pl-3 pr-1 flex items-center justify-between cursor-pointer hover:bg-gray-background rounded-xl"}>
                {children}
            </Link> :
        <div {...rest} className={"py-3 pl-3 pr-1 flex items-center justify-between cursor-pointer hover:bg-gray-background rounded-xl"}>
            {children}
        </div>
    );
};
