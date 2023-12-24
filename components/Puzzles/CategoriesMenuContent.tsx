"use client"
import {ICategory} from "@/types/common";
import Image from "next/image";
import Link from "next/link";


interface ICategoriesMenuContent {
    data : ICategory[]
}


export const CategoriesMenuContent : React.FC<ICategoriesMenuContent> = ({data}) => {
    return (
        <>
            <div className={"flex flex-col space-y-1 p-3"}>
                {data?.slice(4, 1000).map((item : any) => {
                    return  (<Link href={`/category/${item.id}`} className={"px-3 py-2 rounded-lg hover:bg-gray-background cursor-pointer flex space-x-3 items-center"}>
                        <div className="w-6 h-6 relative">
                            <Image src={item.imageUrl} alt={""} fill/>
                        </div>
                        <div className="text-small-light">
                            {item.name.replace(/\\n/g, "")}
                        </div>
                    </Link>);
                })}
            </div>
        </>
    );
};
