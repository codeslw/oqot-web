import {Button as MuiButton, ButtonProps, ButtonTypeMap, ExtendButtonBase} from "@mui/material";
import {Icon} from "@mui/material";

interface IButton extends  ButtonProps{
    theme: "primary" | "secondary" | "tertiary" | "ghost";
    state?: "default" | "focus" | "light";
    text: string;
}



type IButtonProps  = IButton & ButtonProps


export const Button : React.FC<IButton> = ({
         theme, state, text, ...rest
                       }) => {
    return (
        <MuiButton

         className={`${(theme === "primary") ? "bg-blue-default hover:bg-blue-focus disabled:bg-blue-focus text-base-bold text-black-primary disabled:text-white" 
             : theme === "secondary" ? "bg-red-default hover:bg-red-focus disabled:bg-red-disabled text-base-bold text-white" 
             : theme === "tertiary"  ?  "bg-gray-background  hover:bg-gray-focus disabled:bg-gray-disabled text-base-bold disabled:text-gray-secondary dark:bg-gray-background-dark dark:hover:bg-gray-background-focus-dark" 
                     : "bg-transparent text-base-bold hover:text-blue-text disabled:text-gray-secondary"}
                     flex items-center rounded-2xl space-x-3 px-6 py-4 lowercase capitalize sm:space-x-0 xs:px-3  lg:min-w-max 
         `}
         {...rest}
        >
            {/*{StartIcon ? <StartIcon className={"dark:fill-white fill-black-primary"}/> : null}*/}
            <div>{text}</div>
            {/*{EndIcon ? <EndIcon className={"dark:fill-white fill-black-primary"}/> : null}*/}
        </MuiButton>
    );
};
