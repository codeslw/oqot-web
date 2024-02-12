"use client"
import {Box, Snackbar, Stack, Tooltip} from "@mui/material";
import {useTranslations} from "use-intl";
import {useCallback, useMemo, useState} from "react";
import {formatPrice} from "@/utils/services";
import {Button} from "@/components/Button";
import {useRouter} from "next/navigation";
import cartStore from "@/utils/stores/CartStore";
import UIStore from "@/utils/stores/UIStore";
import Link from "next/link";
import RefreshIcon from "@/public/icons/refresh.svg"

interface ICartPriceInfoPanel {
    goodCount : number;
    totalGoodPrice : number;
    discount : number;
    deliveryPrice : number;
    totalPrice : number;
    handleClickCreateOrder? : () => void;
    withCheque? : boolean
}
export const CartPriceInfoPanel:React.FC<ICartPriceInfoPanel> = ({goodCount, totalGoodPrice, discount, deliveryPrice, totalPrice, handleClickCreateOrder, withCheque}) => {
    const t = useTranslations("Cart");
    const [showCartEmptyNotification, setShowCartEmptyNotification] = useState(false);
    const router = useRouter();

    const handleClickContinue = () => {
        router.push("/create_order");
    }

    const generateGoodCountText = useCallback((count : number) => (count === 1  ? `${count} ${t("good")}`
                : count === 0 || count > 4 ?`${count} ${t("goods")}`
                : count > 1 && count < 5 ? `${count} ${t("gooda")}`
                : `${count} ${t("goods")}`), [t, goodCount]);

    const priceInfo = useMemo(() => {
            return [
                {text : generateGoodCountText(goodCount) ,  price :`${formatPrice(totalGoodPrice)} ${t("sum")}`},
                {text : t("Discount"),  price : `-${formatPrice(discount)} ${t("sum")}` },
                {text : t("Delivery"),  price : deliveryPrice ? `${formatPrice(deliveryPrice)} ${t("sum")}` : t("Free") },

            ]
    }, [t, generateGoodCountText, goodCount, totalGoodPrice, deliveryPrice, discount, totalPrice, deliveryPrice]);


    const handlePrint = () => {
        const elementId = "cheque"
        const elementToPrint = document.getElementById(elementId);

        if (elementToPrint) {
            const printDocument = document.createElement('div');
            console.log(printDocument)
            printDocument.innerHTML = elementToPrint.outerHTML;
            document.body.appendChild(printDocument);

            // Apply print-specific styles
            const printStyles = `
        @media print {
          body * {
            display: none;
          }
          #${elementId}, #${elementId} * {
            display: block;
          }
          #${elementId} {
            width: 80mm;
            padding: 10px;
            border: 1px solid #000;
          }
        }
      `;

            const styleSheet = document.createElement('style');
            styleSheet.type = 'text/css';
            styleSheet.innerText = printStyles;
            document.head.appendChild(styleSheet);

            window.print();

            // Cleanup
            document.body.removeChild(printDocument);
            document.head.removeChild(styleSheet);
        } else {
            console.error(`Element with id '${elementId}' not found.`);
        }
    };

    return <Box className={"w-full mt-10 lg:mt-5 xl:mt-0 xl:w-[87%] ml-auto p-8 rounded-3xl border border-gray-default spacing sticky top-[88px]"}>
        <Stack spacing={3}>
            <div className="text-xl-bold">
                {t("In your order")}
            </div>
            <div className="flex flex-col space-y-3">
                {priceInfo.map(({text, price}) => (<div className="flex justify-between items-center">
                    <div className="text-base-light-gray">
                        {text}
                    </div>
                    <div className="text-base-light">
                        {price}
                    </div>
                </div>))}
                <div className="mt-6 flex justify-between items-center">
                    <div className="text-xl-bold">
                        {t("Total")}
                    </div>
                    <div className={"text-xl-bold"}>
                        {`${formatPrice(totalPrice)} ${t("sum")}`}
                    </div>
                </div>
            </div>
            {!withCheque ? <Button onClick={handleClickCreateOrder ?? handleClickContinue} theme={"primary"}
                     text={t('Create order')}/>
                : <div className={"flex flex-col space-y-4 w-full"}>
                    <Tooltip title={t("This function will be soon")}>
                        <>
                            <Button
                                onClick={handlePrint}
                                title={t("This function will be soon")}
                                theme={"tertiary"} text={t("Cheque")} disabled={true} startIcon={RefreshIcon}/>
                        </>
                    </Tooltip>

            </div>
            }
            <div className="text-base-light-gray text-center">
                {t("Delivery info_text")}
            </div>
        </Stack>
        <Snackbar
         open={showCartEmptyNotification}
         onClose={() => setShowCartEmptyNotification(false)}
         anchorOrigin={{
             vertical: 'top',
             horizontal: 'left',
         }}
         className={``}
         message  = {t("Your cart is empty")}
        />
    </Box>

};