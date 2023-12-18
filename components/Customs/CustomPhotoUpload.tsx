"use client"
import PhotoIcon from "@/public/icons/photo.svg"
import {useTranslations} from "use-intl";
import {Input} from "@/components/Input";
import {ChangeEventHandler, LegacyRef, useRef} from "react";
import {Avatar} from "@mui/material";
import DeleteIcon from "@/public/icons/trashbin.svg"


interface ICustomInput {
    onChange : ChangeEventHandler<HTMLInputElement> | undefined,
    photoPath : string | undefined,
}

export const CustomPhotoUpload : React.FC<ICustomInput> = ({onChange, photoPath}) => {

    const t = useTranslations("Authentication");

    const inputRef :  LegacyRef<HTMLInputElement> | undefined = useRef(null);

    const handleUploadClick = () => {
        inputRef.current?.click();
    }

    if(photoPath) {
        return  <div className={`w-full justify-center items-center flex`}>
            <div className={"w-[120x] h-[120px] rounded-full relative overflow-hidden"}>
                <Avatar className={`h-[120px] w-[120px] rounded-full brightness-[75%] hover:cursor-pointer`} src={photoPath}/>
                <div className={"absolute w-full h-full bg-transparent z-30 top-0 left-0 opacity-0 hover:opacity-100 transition-all duration-300 flex justify-center items-center cursor-pointer"}>
                    <DeleteIcon className={"fill-white"}/>
                </div>
            </div>
        </div>
    }

    return (
        <div onClick={handleUploadClick} className={"w-full flex justify-center items-center space-x-3 px-6 py-4 cursor-pointer"}>
            <PhotoIcon/>
            <div className="text-base-bold dark:text-black-primary">
                {t("Upload a photo")}
            </div>
            <input onChange={onChange} type="file" className="hidden" ref={inputRef}/>
        </div>
    );
};
