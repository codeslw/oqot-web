"use client"

import React from "react";
import Image from "next/image";
import Link from "next/link";

interface ITabCategory {
    id : string | number | null,
    photoPath? : string,
    name : string,
    all: boolean,
    handleClick? : React.MouseEventHandler<HTMLAnchorElement>
    isActive : boolean,
    isSubcategory? : boolean
}
export const TabCategory:React.FC<ITabCategory> = React.memo(({
                                                            id,
                                                            photoPath,
                                                            name,
                                                            all,
                                                            handleClick,
                                                            isActive,
                                                            isSubcategory
                                                              }) => {




    return (
        <Link href={(isSubcategory || all) ? `` : `/category/${id}`}  onClick={handleClick} className={`flex space-x-3 px-6 ${!all ? "py-3" : "py-4"} rounded-[4rem] hover:bg-gray-background items-center ${isActive ? "bg-gray-background" : ""} cursor-pointer`}>
            {(!all && !!photoPath) && <div className={`relative w-8  h-8 flex-center rounded-3`}>
                <Image src={photoPath} alt={""} fill={true}/>
            </div>}
            <div className="text-base-bold-gray hover:text-black-primary whitespace-nowrap">
                {name.replace(/\\n/g, " ")}
            </div>
        </Link>
    );
});
