"use client"
import  EmptyImage from "@/public/images/EmptyImage.svg"
import {Button} from "@/components/Button";

interface IEmpty {
    title : string;
    message : string;
    buttonText?: string;
    onButtonClicked?: () => void;
}


export const Empty: React.FC<IEmpty> = ({title, message, buttonText, onButtonClicked}) => {
    return (<div className={"w-full h-max p-10 lg:p-20 flex flex-col items-center space-y-4 lg:space-y-8"}>
        <EmptyImage/>
        <div className="flex flex-col items-center space-y-3">
            <div className={"text-2xl font-semibold text-center"}>{title}</div>
            <div className="text-base-light-gray">{message}</div>
        </div>
        {buttonText? <Button theme={"primary"} text={buttonText} onClick={onButtonClicked}/> : null}
    </div>)
}