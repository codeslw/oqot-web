import {Paper, SwipeableDrawer, SwipeableDrawerProps} from "@mui/material";
import React from "react";
import {observe} from "mobx";
import {observer} from "mobx-react-lite";


interface IPopup extends  SwipeableDrawerProps {

}

export const Popup : React.FC<IPopup> = observer(({children,...rest}) => {
    return (
        <SwipeableDrawer
            {...rest}
            PaperProps = {{
                className : "!rounded-t-3xl w-screen h-max"
            }}
        >
            {children}
        </SwipeableDrawer>
    );
});
