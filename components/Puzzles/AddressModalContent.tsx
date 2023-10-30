import {Stack} from "@mui/material";
import {Input} from "@/components/Input";
import {Button} from "@/components/Button";
import {YandexMap} from "@/components/Customs/YandexMap";

export const AddressModalContent = () => {
    return (
        <Stack spacing={3}>
            <Stack direction={"column"} spacing={2}>
                <div className="text-3xl-bold dark:text-black-primary">
                    {"Выберите адрес доставки"}
                </div>
                <div className="text-base-light-gray">
                    {"От этого зависит ассортимент"}
                </div>
            </Stack>
            <Stack  gap={2} direction={["column","row"]}>
                <div className="w-1/2 flex justify-between px-3  md:px-6 py-4 rounded-2xl border border-gray-secondary hover:border transition-all duration-300 cursor-pointer hover:border-orange-focus">
                    <div className="text-base-bold dark:text-black-primary">{'Доставка'}</div>
                    <div className="text-base-light-gray">{'От 25 000 сум'}</div>
                </div>
                <div className="w-1/2 flex justify-between px-3  md:px-6 py-4 rounded-2xl border border-gray-secondary hover:border cursor-pointer hover:border-orange-focus">
                    <div className="text-base-bold dark:text-black-primary">{'Самовывоз'}</div>
                    <div className="text-base-light-gray">{'Бесплатно'}</div>
                </div>
            </Stack>
            <Stack direction={"row"} spacing={2}>
                <Input errorMessage={""}
                       lightBackground
                       variant={"filled"}
                       inputClasses={"flex grow dark:text-black-primary dark:bg-gray-background"}
                       placeholder={"Введите адрес, чтобы найти ближайшие пункты самовывоза"}/>
                <Button theme={"primary"}  text={"Заберу отсюда"} disabled={true}/>
            </Stack>
            <div className="sm:w-[450px] md:w-[550px] lg:w-[700px] xl:w-[860px] aspect-[86/37] rounded-3xl bg-gray-background overflow-hidden">
                <YandexMap/>
            </div>
        </Stack>

    );
};
