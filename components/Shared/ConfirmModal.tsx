import {Modal} from "@/components/Modal";
import {Stack} from "@mui/material";
import {Button} from "@/components/Button";
import {useTranslations} from "use-intl";

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

    return <Modal open={open} onClose={onClose} onCloseIconClicked={onClose}>
        <Stack spacing={3}>
            <Stack spacing={2}>
                <div className="text-3xl-bold">{title}</div>
                <div className="text-base-light">{message}</div>
            </Stack>
            <div className="w-full flex space-x-4 items-center">
                <Button loading={confirmLoading} theme={"secondary"} text={confirmText ?? t("Confirm")} onClick={onConfirm}/>
                <Button theme={"tertiary"} text={cancelText ?? t("Cancel")} onClick={onCancel}/>
            </div>
        </Stack>
    </Modal>
}