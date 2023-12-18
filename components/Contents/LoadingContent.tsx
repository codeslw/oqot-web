"use client"

import {CircularProgress} from "@mui/material";

export const LoadingContent = () => {


    return <div className={"w-full h-full flex justify-center items-center min-h-[40rem]"}>
        <CircularProgress className={"text-orange-default"} size={42}/>
    </div>
}