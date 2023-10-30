import {ReactNode} from "react";
import ChervonRightIcon from "@/public/icons/right-chevron.svg";
import Link from "next/link";


interface IGoodListWrapper {
    id ?: string;
    children : ReactNode,
    title : string,
    path : string
}

export const GoodListWrapper : React.FC<IGoodListWrapper> = ({ id, title, path,children}) => {
    return(
        <div id={id} className="flex flex-col space-y-6">
            <div className="flex justify-between">
                <div className="font-semibold text-lg dark:text-white md:text-xl xl:text-3xl">
                    {title}

                </div>
                <Link href={path}  className="flex space-x-2 items-center text-base-bold-gray cursor-pointer">
                    <div>{"Больше"}</div>
                    <ChervonRightIcon className={"fill-gray-secondary dark:fill-gray-secondary-dark"}/>
                </Link>
            </div>
        <div className={"grid grid-cols-3 sm:grid-cols-4 xl:grid-cols-5 gap-2 md:gap-3 lg:gap-4 xl:gap-5 mt-6"}>
        {children}
        </div>
    </div>)
}