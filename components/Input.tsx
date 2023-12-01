import {FormGroup, FormHelperText, InputAdornment, TextField, TextFieldProps} from "@mui/material"


interface  IInput extends  TextFieldProps<"filled"> {
errorMessage : string,
extraClasses?: string,
inputClasses? : string,
startIconClasses?: string,
endIconClasses? : string,
StartIcon?: any,
EndIcon?: any,
field?: any
lightBackground?: boolean,
prefix?: string
}

export const Input : React.FC<IInput> = ({ inputClasses,
                                             StartIcon,
                                             EndIcon,
                                             extraClasses,
                                             errorMessage,
                                             lightBackground,
                                             startIconClasses,
                                             field,
                                             endIconClasses,
                                              prefix,
                                             ...rest}) => {
    return (
        <FormGroup className={"w-full"}>
            <TextField
                InputProps={{
                    className : `p-0 !bg-transparent hover:bg-transparent`,
                    sx : {
                        "& input::-webkit-outer-spin-button, & input::-webkit-inner-spin-button": {
                             display: "none",
                        },
                        "& input[type=number]": {
                            MozAppearance: "textfield",
                        },
                    },
                    disableUnderline : true,
                    prefix : prefix,
                    autoComplete :"off",
                    "aria-autocomplete" : "none",
                    startAdornment  : (StartIcon) ? <InputAdornment className={`!h-[55px] pl-6 !max-h-[55px] !min-h-[55px] !m-0 rounded-l-2xl ${errorMessage ? "bg-red-background dark:bg-red-background" : `bg-gray-background ${lightBackground ? "" : "dark:bg-gray-background-dark"}`}`} position={"start"}>
                                                    <StartIcon className={`fill-black-primary dark:fill-gray-secondary-dark ${startIconClasses}`}/>
                                                   </InputAdornment> : undefined,
                    endAdornment : (EndIcon) ? <InputAdornment className={`!h-[55px] pr-6 !max-h-[55px] !min-h-[55px] !m-0 rounded-r-2xl ${errorMessage ? "bg-red-background dark:bg-red-background" : `bg-gray-background`}`} position={"end"}>
                                                    <EndIcon className={`fill-black-primary dark:fill-white ${endIconClasses}`}/>
                                                   </InputAdornment> : undefined,

                }}
                className={`p-0 bg-transparent focus:decoration-none focus-visible:border-none border-none ${extraClasses}`}
                inputProps={{
                    autoComplete :"off",
                    className : `placeholder:text-gray-secondary   w-full ${lightBackground ? "text-black-primary" : ""}
                    ${errorMessage ? "bg-red-background dark:bg-red-background" : `bg-gray-background ${lightBackground ? "dark:bg-gray-background" : "dark:bg-gray-background-dark" }`} text-base-light leading-4  ${StartIcon ? "pl-4 pr-6" : "px-6 rounded-l-2xl"} ${EndIcon ? "pr-4 pl-6" : "px-6 rounded-r-2xl"}  py-4 
          `
                }}

                {...rest}
            />

            {errorMessage ? <FormHelperText className={'text-red-default'}>{errorMessage}</FormHelperText> : null}
        </FormGroup>


    );
};
