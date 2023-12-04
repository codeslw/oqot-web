import {Box, Stack} from "@mui/material";
import React, {JSX, ReactNode} from "react";

interface ICustomBadge {
    Icon : ReactNode,
    title : string,
    color : string
}

export const CustomBadge : React.FC<ICustomBadge> = ({Icon, color, title}) => {
    return <Box className={"flex space-x-2 rounded-2xl max-w-max px-3 -y-0.5"} sx={{
        background : color,
    }}>
        <div className={'text-white'}>
            {Icon}
        </div>
        <div className="text-base-bold text-white">
            {title}
        </div>
    </Box>
}