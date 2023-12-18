"use client"
import {useTranslations} from "use-intl";
import RightChevron from "@/public/icons/right-chevron-mini.svg"
import Link from "next/link";

interface IOption {
    title : string;
    path : string;
    isActive : boolean;
}
interface ICustomBreadCrumb {
    options : IOption[];
    inModal?: boolean;
}


export const CustomBreadCrumb:React.FC<ICustomBreadCrumb> = ({options, inModal}) => {

    const t = useTranslations();

    return <div className={`flex items-center space-x-1 ${inModal ? "max-w-[518px]" : "max-w-full"}`}>
        {options?.map((option : IOption, index, list) => {
            return <div className={"flex space-x-1 cursor-pointer"}>
                <Link href={option.path} className={`${!option.isActive ? "text-base-light hover:text-gray-400" : "text-base-light-gray"} ${(index === 2 && inModal) ? "whitespace-wrap" : "whitespace-nowrap"}`}>
                    {((inModal && index === 2) ? option.title.substring(0, 15) + "..." : option.title)}
                </Link>
                {index !== list.length - 1 && <RightChevron className={"fill-gray-secondary"}/>}
            </div>
        })}
    </div>
}