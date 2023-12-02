import {Box, Stack} from "@mui/material";
import React, {JSX, ReactNode} from "react";

interface ICustomBadge {
    Icon : () => JSX.Element,
    title : string,
    color : string
}

export const CustomBadge : React.FC<ICustomBadge> = ({Icon, color, title}) => {
    return <Box className={"flex space-x-2"} sx={{
        background : color,
    }}>
        <Icon/>
        <div className="text-base-bold text-white">
            {title}
        </div>
    </Box>
}