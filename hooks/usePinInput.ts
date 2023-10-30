import {ChangeEvent, useState} from "react";

export const usePinInput = () => {
    const [pin, setPin] = useState(['', '', '', '', '', '']);

    const handlePinChange = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>, slot : number) => {
        const inputPin = event.target.value.replace(/\D/g, '');
        const newPin = [...pin];
        newPin[slot] = inputPin;
        setPin(newPin);
    };

    return {handlePinChange, pin, setPin}
}