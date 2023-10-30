import {Box, Stack} from "@mui/material";
import {useTranslations} from "use-intl";
import {useCallback, useMemo} from "react";
import {formatPrice} from "@/utils/services";
import {Button} from "@/components/Button";

interface ICartPriceInfoPanel {
    goodCount : number;
    totalGoodPrice : number;
    discount : number;
    deliveryPrice : number;
    totalPrice : number;
}
export const CartPriceInfoPanel:React.FC<ICartPriceInfoPanel> = ({goodCount, totalGoodPrice, discount, deliveryPrice, totalPrice}) => {
    const t = useTranslations("Cart");

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


    return <Box className={"w-[87%] ml-auto p-8 rounded-3xl border border-gray-default spacing"}>
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
            <Button theme={"primary"} text={t('Create order')}/>
            <div className="text-base-light-gray text-center">
                {t("Delivery info_text")}
            </div>
        </Stack>
    </Box>;
};