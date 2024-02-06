"use client"
import {Button} from "@mui/base";
import PlusIcon from "@/public/icons/plus.svg"
import PlusIconMini from "@/public/icons/plus-mini.svg"
import MinusIcon from "@/public/icons/minus.svg"
import MinusMiniIcon from "@/public/icons/minus-mini.svg"

interface ICustomProductCounterButton {
    handleIncrement : (e : any) => void;
    handleDecrement : (e : any) => void;
    count : number;
    forCart?:boolean
}

export const CustomProductCounterButton : React.FC<ICustomProductCounterButton> = ({handleIncrement, handleDecrement, count, forCart}) => {
        return <Button
            style={{
                boxShadow : "-4px 4px 12px 0px rgba(0, 0, 0, 0.12)"
            }}
            className={`w-[80px] sm:w-[104px] h-6 sm:h-9 rounded-lg sm:rounded-xl bg-gray-background flex space-x-1.5 p-1.5 shadow-button cursor-pointer ${forCart ? "" : "absolute top-2 right-2 z-20"} hover:bg-gray-background-focus`}>
           <div onClick={handleDecrement} className="flex justify-center items-centered">
               <MinusIcon w={20} h={20}  className={"fill-black-primary hidden sm:block"}/>
               <MinusMiniIcon w={20} h={20} className={"fill-black-primary sm:hidden"}/>
           </div>
            <div className="w-8 h-3 sm:h-6  flex justify-center items-center sm:text-base-bold  dark:text-black-primary">
                {count}
            </div>
            <div onClick={handleIncrement} className="flex justify-center items-centered">
                <PlusIcon w={20} h={20}  className="fill-black-primary hidden sm:block"/>
                <PlusIconMini className="fill-black-primary sm:hidden"/>
            </div>
        </Button>
}