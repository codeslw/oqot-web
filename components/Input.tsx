import {FormGroup, FormHelperText, InputAdornment, TextField, TextFieldProps} from "@mui/material"


interface  IInput extends  TextFieldProps<"filled"> {
errorMessage : string,
extraClasses?: string,
StartIcon?: any,
EndIcon?: any
}

export const Input : React.FC<IInput> = ({ StartIcon, EndIcon,extraClasses,errorMessage,...rest}) => {
    return (
        <FormGroup className={"w-full"}>
            <TextField

                InputProps={{
                    className : "p-0 !bg-transparent hover:bg-transparent ",
                    disableUnderline : true,
                    startAdornment  : StartIcon ?<InputAdornment className={`!h-[55px] pl-6 !max-h-[55px] !min-h-[55px] !m-0 rounded-l-2xl ${errorMessage ? "bg-red-background dark:bg-red-background" : "bg-gray-background dark:bg-gray-background-dark"}`} position={"start"}>
                        <StartIcon className={"fill-black-primary dark:fill-gray-secondary-dark"}/>
                    </InputAdornment> : undefined,
                    endAdornment : EndIcon ?<InputAdornment className={`${errorMessage ? "bg-red-background dark:bg-red-background" : "bg-gray-background dark:bg-gray-dark"}`} position={"start"}>
                        <EndIcon className={"fill-black-primary dark:fill-white"}/>
                    </InputAdornment> : undefined
                }}
                className={`p-0 bg-transparent focus:decoration-none focus-visible:border-none border-none ${extraClasses}`}
                inputProps={{
                    className : `placeholder:text-gray-secondary rounded-r-2xl  w-full
                    ${errorMessage ? "bg-red-background dark:bg-red-background" : "bg-gray-background dark:bg-gray-background-dark"} text-base-light leading-4  ${StartIcon ? "pl-4 pr-6" : "px-6"} ${EndIcon ? "pr-4 pl-6" : "px-6"}  py-4
          `
                }}
                {...rest}
            />

            {errorMessage ? <FormHelperText>{errorMessage}</FormHelperText> : null}
        </FormGroup>


    );
};
