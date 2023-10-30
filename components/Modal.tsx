import {Box, IconButton, ModalProps} from "@mui/material";
import React, {ReactNode} from "react";
import {Modal as MuiModal} from "@mui/material"
import XIcon from "@/public/icons/x.svg"
interface IModal extends ModalProps {
    onCloseIconClicked : () => void,
    extraClassName?: string,
}

export const Modal:React.FC<IModal> = ({ onCloseIconClicked, extraClassName,...rest}) => {
    return (
        <MuiModal {...rest}>
            <Box className={`w-max h-max rounded-3xl p-8 bg-white relative top-[50%] left-[50%] -translate-x-1/2 -translate-y-1/2 focus-visible:border-none focus-visible:outline-none focus-visible:shadow-none ${extraClassName}`}>
                <IconButton onClick={onCloseIconClicked} className={"p-4 right-0 top-0 absolute"}>
                    <XIcon className={"fill-gray-secondary"}/>
                </IconButton>
                {rest.children}
            </Box>
        </MuiModal>
    );
};
