"use client"
import {Popover, PopoverProps} from "@mui/material";
import {ReactNode} from "react";

interface IMenu extends PopoverProps{
    children : ReactNode,
    open : boolean,
    id : string,

}


export const Menu : React.FC<IMenu> = ({id, open, children,...rest}) => {
    return (
        <Popover
            id = {id}
            open={open}
            anchorOrigin={{
                vertical : "bottom",
                horizontal :"center"
            }}
            transformOrigin = {{
                vertical : "top",
                horizontal : "center"
            }}
            disableScrollLock={true}
            {...rest}
            slotProps = {{
                paper : {
                    className : "rounded-2xl mt-3 shadow-modal"
                }
            }}
        >
            {children}
        </Popover>
    );
};
