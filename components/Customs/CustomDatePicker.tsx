import {DatePicker} from "@mui/x-date-pickers";
import {Input} from "@/components/Input";
import {TextFieldProps} from "@mui/material";
import CalendarIcon from "@/public/icons/calendar.svg"
import React from "react";
import {useToggle} from "@/hooks/useToggle";
import {useTranslations} from "use-intl";
import {values} from "mobx";
import {format} from "date-fns";



interface ICustomDatePicker {
    errorMessage?: string,
    placeholder?: string,
}


interface IDatePickerAdornment  {
   // onClick : () => void;
}
const DatePickerAdornment  = (props : any) => {
    return <div className={"flex-center"} onClick={props.onClick}>
        <CalendarIcon className={"cursor-pointer"}/>
    </div>
}

export const CustomDatePicker:React.FC<ICustomDatePicker> = ({ errorMessage, placeholder,...rest}) => {
    const t = useTranslations("Date");
    const {open, onOpen, onToggle, onClose} = useToggle();



    return <DatePicker
        open = {open}
        onOpen = {onOpen}
        onClose={onClose}
        timezone={"system"}
        dayOfWeekFormatter={(day : string, date : unknown) => {
            return t(day)
        }}
        format={"dd.MM.yyyy"}
        slots={{
            inputAdornment : DatePickerAdornment,
        }}
        slotProps={{
            inputAdornment : {
                onClick : onToggle
            },

            day : {
                className : "hover:bg-gray-background text-xs-bold w-8 h-8",
                classes : {
                    selected : "bg-gray-background text-xs-bold text-black-primary font-bold",
                    disabled : "text-xs-bold-gray",
                    root : "text-xs-bold",
                },

            },
            calendarHeader : {
                className : "flex text-center w-full",
                classes : {
                    label : "ml-auto w-full text-base-bold",
                    labelContainer : "mx-auto",


                },
                slotProps : {
                    switchViewButton : {
                        className : "hidden"
                    },
                    nextIconButton : {
                        className : "absolute top-3 right-3"
                    },
                    previousIconButton : {
                        className : "absolute top-3 left-3"
                    },
                },
            },
            field : {
                className : "bg-red-400"
            },

            layout : {
                classes : {
                   contentWrapper : "max-h-max"
                }
            },
            desktopPaper : {
                className : "rounded-2xl overflow-hidden p-0 h-[300px]",
            },
            textField : {
                variant : "filled",
                className : `${errorMessage ? "bg-red-background"  : "bg-gray-background"} rounded-2xl overflow-hidden p-0`,
                InputProps:  {
                    disableUnderline : true,
                    className: `p-0 px-6 ${errorMessage? "bg-red-background" : "bg-gray-background"}`,
                    placeholder : placeholder ?? "",
                },
                inputProps:  {
                    className: "py-4 px-0",
                },
            }
        }}
        {...rest}
    />
}