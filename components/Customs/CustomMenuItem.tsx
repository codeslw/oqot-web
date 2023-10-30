import React, {DetailedHTMLProps, HTMLAttributes, ReactNode} from "react";

interface IMenuItem extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>{
    children : ReactNode
}

export const CustomMenuItem:React.FC<IMenuItem> = ({children,...rest}) => {
    return (
        <div {...rest} className={"py-3 pl-3 pr-1 flex items-center justify-between cursor-pointer hover:bg-gray-background rounded-xl"}>
            {children}
        </div>
    );
};
