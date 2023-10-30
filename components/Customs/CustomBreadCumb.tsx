import {useTranslations} from "use-intl";
import RightChevron from "@/public/icons/right-chevron-mini.svg"

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
                <div className={`${option.isActive ? "text-small-light" : "text-small-light-gray"}`}>
                    {option.title}
                </div>
                {index !== list.length - 1 && <RightChevron className={"fill-gray-secondary"}/>}
            </div>
        })}
    </div>
}