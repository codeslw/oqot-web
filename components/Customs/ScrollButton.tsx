"use client"
import {IconButton} from "@mui/material";
import ChervonRightIcon from "@/public/icons/right-chevron.svg"
import ChervonLeftIcon from "@/public/icons/left-chevron.svg"
import {left} from "@popperjs/core";

interface IScrollButton {
    direction : "left" | "right"
}

export const ScrollButton:React.FC<IScrollButton> = ({direction}) => {
    return (<IconButton onClick={() => { scroll({
        left: direction === "left" ? -200 : 200,
        behavior : "smooth",
    })}} className={"w-8 h-8 rounded-full flex-center bg-white z-30 !p-0 hover:bg-white shadow-md"}>
            {direction === "left" ? <ChervonLeftIcon className={"fill-black-primary"}/> :  <ChervonRightIcon className={"fill-black-primary min-w-6 min-h-6"}/>}
        </IconButton>);
};
