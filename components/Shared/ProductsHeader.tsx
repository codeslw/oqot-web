import {useTranslations} from "use-intl";
import RightChevronIcon from "@/public/icons/right-chevron.svg"
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
        <div className="flex space-x-2 items-center text-base-bold-gray">
            {t("More")}
            <RightChevronIcon className={"fill-gray-primary"}/>
        </div>
    </div>
}