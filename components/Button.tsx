import {Button as MuiButton, ButtonProps, ButtonTypeMap, CircularProgress, ExtendButtonBase} from "@mui/material";
import {Icon} from "@mui/material";
import {useMemo} from "react";

interface IButton extends  ButtonProps{
    theme: "primary" | "secondary" | "tertiary" | "ghost";
    state?: "default" | "focus" | "light";
    loading?: boolean;
    extraClasses? : string;
    text: string;
    textClasses?:string;
    SuffixIcon?:string;
}



type IButtonProps  = IButton & ButtonProps


export const Button : React.FC<IButton> = ({
                                               theme,
                                               loading,
                                               state,
                                               text,
                                               textClasses,
                                               extraClasses, ...rest
                       }) => {

    return (
        <MuiButton
            {...rest}
            className={`${(theme === "primary") ? "btn-primary" 
             : theme === "secondary" ? "btn-secondary" 
             : theme === "tertiary"  ?  "btn-tertiary" 
                     : "btn-ghost"}
                     btn-default ${extraClasses ?? ""}
            `}

        >
            {/*{StartIcon ? <StartIcon className={"dark:fill-white fill-black-primary"}/> : null}*/}

            <div className={`text-base-bold mr-4 ${theme === "secondary" ? "text-white"  : ""} ${textClasses}`}>{text}</div>
                {loading ? <CircularProgress size={20} className={"text-white"}/> : null}
            {/*{EndIcon ? <EndIcon className={"dark:fill-white fill-black-primary"}/> : null}*/}
        </MuiButton>
    );
};
