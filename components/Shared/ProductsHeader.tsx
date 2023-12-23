"use client"
import {useTranslations} from "use-intl";
import RightChevronIcon from "@/public/icons/right-chevron.svg"
import Link from "next/link";
interface IProductsHeader {
    title: string;
    link: string;
}

export const ProductsHeader : React.FC<IProductsHeader> = ({title, link}) => {
    const t = useTranslations('Common');
    return <div className={`w-full flex justify-between`}>
        <div className="text-3xl-bold">
            {title}
        </div>
        <Link href={link ?? ""} className="flex space-x-2 items-center text-base-bold-gray cursor-pointer">
            {t("More")}
            <RightChevronIcon className={"fill-gray-primary"}/>
        </Link>
    </div>
}