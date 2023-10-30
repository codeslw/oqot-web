import React, {ChangeEvent, Dispatch, MutableRefObject, RefObject, SetStateAction, useRef, useState} from "react";
import TextField from "@mui/material/TextField";
import {event} from "yandex-maps";
import {Stack} from "@mui/material";

interface  IPinInput {
    handlePinChange  : (event : ChangeEvent<HTMLInputElement | HTMLTextAreaElement>, slot : number) => void,
    pin : string[],
    errorMessage ? :  string
    setPin : Dispatch<SetStateAction<string[]>>
}
export  const  PinInput:React.FC<IPinInput> = ({handlePinChange, pin, setPin, errorMessage})  => {

    const pinRefs : any = useRef([]);

    return (
        <Stack spacing={0.5}>
            <div className={"flex w-full space-x-2"}>
                {pin.map((value, index, list) => (
                    <TextField
                        key={index}
                        type="text"
                        value={value}
                        onChange={(event) => {
                            handlePinChange(event, index);
                            if(index < list.length - 1 && event.target.value) {
                                pinRefs.current[index + 1].focus();
                            }
                            else if(!event.target.value && index > 0) {
                                pinRefs.current[index - 1].focus();
                            }
                        }}
                        variant="filled"
                        inputRef={(el) => {pinRefs.current[index] = el}}
                        inputProps={{ maxLength: 1, className : "px-8 py-4 flex justify-center items-center" }}
                        InputProps={{
                          disableUnderline : true,
                          className : `${errorMessage ? "bg-red-background" : "bg-gray-background"} rounded-2xl border-none p-0 text-center px-full aspect-[5/4]`
                        }}

                    />
                ))}
            </div>
            {errorMessage ? <div className="text-small-light text-red-focus">
                {errorMessage}
            </div> : null}
        </Stack>
    );
};

export default PinInput;
