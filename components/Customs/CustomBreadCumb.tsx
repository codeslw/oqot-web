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
}


export const CustomBreadCrumb:React.FC<ICustomBreadCrumb> = ({options}) => {

    const t = useTranslations();

    return <div className={"w-max flex items-center space-x-1"}>
        {options?.map((option : IOption, index, list) => {
            return <div className={"flex space-x-1 cursor-pointer"}>
                <Link href={option.path} className={`${!option.isActive ? "text-base-light hover:text-gray-400" : "text-base-light-gray"}`}>
                    {option.title}
                </Link>
                {index !== list.length - 1 && <RightChevron className={"fill-gray-secondary"}/>}
            </div>
        })}
    </div>
}