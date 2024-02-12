"use client"
import {Modal} from "@/components/Modal";
import {Stack, useMediaQuery} from "@mui/material";
import {Button} from "@/components/Button";
import {useTranslations} from "use-intl";
import {useTheme} from "@mui/material/styles";
import uistore from "@/utils/stores/UIStore";
import {Popup} from "@/components/Customs/Popup";

interface IConfirmModal {
    open : boolean;
    onClose : () => void;
    title : string;
    message : string;
    confirmLoading?: boolean;
    onConfirm : () => void;
    onCancel : () => void;
    confirmText?: string;
    cancelText?: string;
}
export const ConfirmModal:React.FC<IConfirmModal> = ({open, onConfirm, onCancel, onClose, message, title, confirmLoading, confirmText, cancelText}) => {
    const t = useTranslations("ConfirmModal");
    const theme = useTheme();
    const matches = useMediaQuery(theme.breakpoints.up('sm'));
    return matches ?
    <Modal open={open} onClose={onClose} onCloseIconClicked={onClose}>
        <Stack spacing={3}>
            <Stack spacing={2}>
                <div className="text-3xl-bold">{title}</div>
                <div className="text-base-light">{message}</div>
            </Stack>
            <div className="w-full flex space-x-4 items-center">
                <Button loading={confirmLoading} theme={"secondary"} text={confirmText ?? t("Confirm")}
                        onClick={onConfirm}/>
                <Button theme={"tertiary"} text={cancelText ?? t("Cancel")} onClick={onCancel}/>
            </div>
        </Stack>
    </Modal> :   <Popup
                className={"sm:hidden"}
                anchor={"bottom"}
                onOpen={() => {}}
                onClose={onClose}
                open={open}>
            <Stack spacing={3} className={"px-3 py-4"}>
                <Stack spacing={2}>
                    <div className="text-3xl-bold">{title}</div>
                    <div className="text-base-light">{message}</div>
                </Stack>
                <div className="w-full flex space-x-4 items-center">
                    <Button loading={confirmLoading} theme={"secondary"} text={confirmText ?? t("Confirm")}
                            onClick={onConfirm}/>
                    <Button theme={"tertiary"} text={cancelText ?? t("Cancel")} onClick={onCancel}/>
                </div>
            </Stack>

            </Popup>
}
