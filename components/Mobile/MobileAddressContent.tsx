import {Stack} from "@mui/material";
import {YandexMap} from "@/components/Customs/YandexMap";
import {Input} from "@/components/Input";

export const MobileAddressContent = () => {
    return (
        <Stack gap={2} className={`pb-5`}>
        <div className={`w-screen h-80`}>
            <YandexMap/>
        </div>
            <Stack direction={"row"} gap={1} className={`px-4`}>
                <div className="w-full flex justify-between items-center px-3 py-2 h-10 rounded-xl border border-gray-focus">
                    <div className="text-base-bold dark:text-black-primary">
                        {"Самовывоз"}
                    </div>
                </div>
                <div className="w-full flex justify-between items-center px-3 py-2 h-10 rounded-xl border border-gray-focus">
                    <div className="text-base-bold dark:text-black-primary">
                    {"Доставка"}
                    </div>
                    <div className="text-xs dark:text-black-primary">
                        {"15000 cум"}
                    </div>
                </div>
            </Stack>
            <div className={`px-4`}>
                <Input placeholder={"Адрес доставки"} errorMessage={""} lightBackground variant={"filled"}/>
            </div>
        </Stack>
    );
};
