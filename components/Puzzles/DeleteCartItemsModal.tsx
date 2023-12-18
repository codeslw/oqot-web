"use client"
import {Snackbar} from "@mui/material";
import {CustomProgress} from "@/components/Customs/CustomProgress";
import {useTranslations} from "use-intl";
import {Button} from "@/components/Button";
import  XIcon from "@/public/icons/x.svg"
import {useEffect} from "react";


interface IProps {
    open?: boolean;
    onClose : () => void;
    recoverGoods : () => void;
    clearGoods : () => void;
}


export const DeleteCartItemsModal : React.FC<IProps>  = ({open, onClose, recoverGoods}) => {

    const t = useTranslations("Cart");



    return <Snackbar
        open={open}
        anchorOrigin={{
            vertical : "bottom",
            horizontal : "center"
        }}
        autoHideDuration={6000}
    >
        <div
            style={{
                boxShadow : "-4px 4px 20px 0px rgba(0, 0, 0, 0.12)"
            }}
            className="flex space-x-5 xl:w-[500px] w-[90%] items-center p-5 bg-white z-20 rounded-2xl">
            <div className="flex space-x-4 items-center">
                <CustomProgress
                    onClose={onClose}
                />
                <div className="text-base-light whitespace-nowrap">
                    {t("Cart is cleared")}
                </div>
            </div>
            <Button
                onClick={() => recoverGoods()}
                textClasses={"!mr-0"}
                theme={"secondary"} text={t("Recover goods")}/>
            <XIcon
                className={"fill-gray-secondary cursor-pointer"}
            />
        </div>
    </Snackbar>
}