'use client'
import {useSynchronizeCart} from "@/hooks/useSynchronizeCart";
import {observer} from "mobx-react-lite";

export const PageChangeListener = observer(() => {
    const {} = useSynchronizeCart();
    return <></>;
});