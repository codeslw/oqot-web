import {TimePicker} from "@mui/x-date-pickers";


interface ITimePicker {
    errorMessage?: string,
    placeholder?: string,
}
export const CustomTimePicker : React.FC<ITimePicker> = ({errorMessage, placeholder, ...rest}) => {

    return <TimePicker

        slotProps={{
            popper : {
               // className : "rounded-2xl overflow-hidden p-0 h-[300px] mt-1 shadow-md",
            },
            desktopPaper : {
              className : "rounded-2xl overflow-hidden mt-2"
            },
            textField : {
                variant : "filled",
                className : `${errorMessage ? "bg-red-background"  : "bg-gray-background"} rounded-2xl overflow-hidden p-0`,
                InputProps:  {
                    disableUnderline : true,
                    className: `p-0 px-6 ${errorMessage? "bg-red-background" : "bg-gray-background"}`,
                    placeholder: placeholder,
                },
                inputProps:  {
                    className: "py-4 px-0",
                },
            }
        }}
        {...rest}
    />
}