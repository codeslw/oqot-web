"use client"
import {useTranslations} from "use-intl";
import {FormControl, FormHelperText, FormLabel, Stack} from "@mui/material";
import {ChangeEvent, useEffect, useMemo, useState} from "react";
import {Input} from "@/components/Input";
import {CustomDatePicker} from "@/components/Customs/CustomDatePicker";
import {CustomPhotoUpload} from "@/components/Customs/CustomPhotoUpload";
import {Button} from "@/components/Button";
import {useMutationApi} from "@/hooks/useMutationApi";
import {AUTH_BASE_URL, BASE_URL, FILE_UPLOAD_URL, REGISTER_URL} from "@/utils/constants";
import {AxiosResponse} from "axios";
import {useForm, Controller} from "react-hook-form";
import {log} from "util";
import {formatDate} from "@/utils/services";
import {useAuth} from "@/hooks/useAuth";



interface IRegistrationModalContent {
    handleRegistration : (data : any, photoPath : string) => void;
}

export const RegistrationModalContent :React.FC<IRegistrationModalContent> = ({handleRegistration}) => {

    const t = useTranslations("Authentication");
    const [photoPath, setPhotoPath] = useState("");
    const uploadPhoto = useMutationApi(FILE_UPLOAD_URL, "post", {});
    const register = useMutationApi(REGISTER_URL, "post", {}, {baseURL : AUTH_BASE_URL});

    const {handleRegister, phoneNumber,registerLoading} = useAuth();

    const {control,
        handleSubmit,
        watch,
        formState} = useForm();




    const fields = useMemo(() => [
        {
            label: t("FirstName"),
            type: "text",
            name: "firstName",
            placeholder: t("FirstName_placeholder"),
        },
        {
            label: t("LastName"),
            type: "text",
            name: "lastName",
            placeholder: t("LastName_placeholder"),
        },
        {
            label: t("Birthday"),
            type: "date",
            name: "date",
            placeholder: t("Birthday_placeholder"),
        },
        {
            label: t("Photo"),
            type: "file",
            name: "photo"
        }
    ], [t]);


    const handleFormSubmit = () => {
        handleSubmit((data) => {
         handleRegistration(data, photoPath)
        })();
    };


    const onPhotoChange = async (e : ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files.length > 0) {
            const file = e.target.files[0];
            const formFile = new FormData();
            formFile.append("formFile", file);
            try {
                const response : any = await uploadPhoto.mutateAsync(formFile);
                if (response.status < 400) {
                    setPhotoPath(`${BASE_URL}/file/download/${response.data}`);
                }
            }
            catch (e) {
                console.log("error occured");
            }
        }
    };

    return <Stack spacing={4}>
        <Stack spacing = {2}>
            <div className="text-3xl-bold dark:text-black-primary">
                {t("Registration")}
            </div>
            <div className="text-base-light-gray max-w-[30rem]">
                {t("Registration_text")}
            </div>
        </Stack>
        <Stack spacing={3}>
            {fields.map((item, index) =>{
                if(item.type === "text") {
                    return <Controller
                        control={control}
                        name={item.name}
                        rules={{required : t('Required')}}
                        render={({field, fieldState : {error}}) => {
                        return (
                            <FormControl>
                                <FormLabel className={"text-base-bold-gray mb-2"}>{item.label}</FormLabel>
                                <Input  errorMessage={error?.message ?? ""} variant={"filled"} {...field}/>
                            </FormControl>
                        );
                    }} />
                  ;
                }
                else if(item.type === "date") {
                    return <Controller
                        control={control}
                        name={item.name}
                        rules={{required : t('Required')}}
                        render={({field, fieldState : {error}}) => {
                            return (<FormControl>
                                <FormLabel className={"text-base-bold-gray mb-2"} >{item.label}</FormLabel>
                                <CustomDatePicker errorMessage={error?.message ?? ""} {...field}/>
                                {error?.message ? <FormHelperText className={'text-red-default'}>{error.message}</FormHelperText> : null}
                            </FormControl>);
                        }}
                    />;
                }
                else if(item.type === "file") {
                    return <CustomPhotoUpload photoPath={photoPath} onChange = {onPhotoChange}/>;
                }
            })}
        </Stack>
        <Button
            onClick={handleFormSubmit}
            loading={registerLoading}
            type={"submit"} theme = "primary" text={t("Register")}/>

    </Stack>;
};