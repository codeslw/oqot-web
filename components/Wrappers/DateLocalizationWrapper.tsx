"use client"
import { LocalizationProvider } from '@mui/x-date-pickers';
import {AdapterDateFns}  from '@mui/x-date-pickers/AdapterDateFns'
import {setDefaultOptions} from "date-fns";


interface IDateLocalizationWrapper {
    children: React.ReactNode;
}


setDefaultOptions({
    weekStartsOn: 1,
})

export const DateLocalizationWrapper : React.FC<IDateLocalizationWrapper> = ({children}) => {

    return (

        <LocalizationProvider dateAdapter={AdapterDateFns}>
            {children}
        </LocalizationProvider>
    );
};
