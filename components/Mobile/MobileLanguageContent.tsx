"use client"
import {Stack} from "@mui/material";
import  FlagUzIcon from  "@/public/icons/Flag-1.svg";
import  FlagRuIcon from  "@/public/icons/Flag.svg";
import  FlagEnIcon from  "@/public/icons/Flag-2.svg";
import React, {useMemo} from "react";
import {Button} from "@/components/Button";
import {languageOptions} from "@/utils/constants";


interface  IMobileLanguageContent {
    onChange : (key : string) => void
}

export const MobileLanguageContent :React.FC<IMobileLanguageContent> = ({onChange}) => {



    return (
        <Stack gap={4} className={"p-4 !h-full"}>
            <Stack gap={2}>
                {languageOptions.map(({Icon, title, key}) => {
                    return <div className="flex space-x-4 items-center" onClick={() => onChange(key)}>
                        <Icon className={"dark:fill-black-primary rounded-full"}/>
                        <div className="text-base-bold dark:text-black-primary">
                            {title}
                        </div>
                    </div>
                })}
            </Stack>
        </Stack>
    );
};
