import {Button} from "@mui/base";
import PlusIcon from "@/public/icons/plus.svg"
import MinusIcon from "@/public/icons/minus.svg"

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
            className={`w-[104px] h-9 rounded-xl bg-gray-background flex space-x-1.5 p-1.5 shadow-button cursor-pointer ${forCart ? "" : "absolute top-2 right-2 z-20"} hover:bg-gray-background-focus`}>
           <div onClick={handleDecrement} className="flex justify-center items-centered">
               <MinusIcon w={20} h={20}  className={"fill-black-primary"}/>
           </div>
            <div className="w-8 h-6 flex justify-center items-center text-base-bold dark:text-black-primary">
                {count}
            </div>
            <div onClick={handleIncrement} className="flex justify-center items-centered">
                <PlusIcon w={20} h={20}  className="fill-black-primary"/>
            </div>
        </Button>
}