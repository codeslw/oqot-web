"use client"

import React from "react";
import Image from "next/image";

interface ITabCategory {
    id : string,
    photoPath? : string,
    name : string,
    all: boolean,
    handleClick? : () => void,
    isActive : boolean,
}
export const TabCategory:React.FC<ITabCategory> = React.memo(({
                                                            id,
                                                            photoPath,
                                                            name,
                                                            all,
                                                            handleClick,
                                                            isActive
                                                              }) => {


    return (
        <div onClick={handleClick} className={`flex space-x-3 px-6 ${!all ? "py-3" : "py-4"} rounded-[4rem] hover:bg-gray-background items-center ${isActive ? "bg-gray-background" : ""} cursor-pointer`}>
            {(!all && !!photoPath) && <div className={`relative w-8 h-8 flex-center rounded-3`}>
                <Image src={photoPath} alt={""} fill={true}/>
            </div>}
            <div className="text-base-bold-gray hover:text-black-primary whitespace-nowrap">
                {name.replace(/\\n/g, " ")}
            </div>
        </div>
    );
});
