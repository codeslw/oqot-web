import React, {useCallback} from 'react'
import Logo from "../../public/icons/logo.svg"
import {useTranslations} from "use-intl";



interface ICheque {
    store: string,
    orderTime: string,
    courier: string,
    phoneNumber: string,
    promocode: string | null,
    address: string,
    paymentType: string,
    name: string,
    cart?: {
        sellingPrice: number,
        count: number,
        name: string
    }[],
    totalSellingPrice: number,
    totalDiscount: number,
    shippingPrice: number,
    totalPrice: number,
    totalGoods: number
}


export default function Cheque(props: ICheque) {

    const  t  = useTranslations("Cart");


    const generateGoodCountText = (count : number) => (count === 1  ? `${count} ${t("good")}`
        : count === 0 || count > 4 ?`${count} ${t("goods")}`
            : count > 1 && count < 5 ? `${count} ${t("gooda")}`
                : `${count} ${t("goods")}`)

    return (
        <div id={"cheque"} className='w-screen h-scree py-5 px-[15px] space-y-4 bg-white'>
            <div className='flex justify-center'>
                <div className="w-[36%] aspect-[82/26]">
                    <Logo />
                </div>
            </div>

            <div className="flex flex-col space-y-2">
                <div className="w-full flex justify-between text-xs">
                    <div className='text-[#676767]'>{t("Store")}</div>
                    <div className='text-black-primary'>{props.store}</div>
                </div>
                <div className="w-full flex justify-between text-xs">
                    <div className='text-[#676767]'>{t("Order time")}</div>
                    <div className='text-black-primary'>{props.orderTime}</div>
                </div>
                <div className="w-full flex justify-between text-xs">
                    <div className='text-[#676767]'>{t("Courier")}</div>
                    <div className='text-black-primary'>{props.courier}</div>
                </div>
                <div className="w-full flex justify-between text-xs">
                    <div className='text-[#676767]'>{t("PaymentType")}</div>
                    <div className='text-black-primary'>{props.paymentType}</div>
                </div>
                <div className="w-full flex justify-between text-xs">
                    <div className='text-[#676767]'>{t("Promocode")}</div>
                    <div className='text-black-primary'>{props.promocode}</div>
                </div>
                <div className="w-full flex justify-between text-xs">
                    <div className='text-[#676767]'>{t("ClientAddress")}</div>
                    <div className='text-black-primary max-w-[39.6%] text-end'>{props.address}</div>
                </div>
                <div className="w-full flex justify-between text-xs">
                    <div className='text-[#676767]'>{t("ClientName")}</div>
                    <div className='text-black-primary'>{props.name}</div>
                </div>
                <div className="w-full flex justify-between text-xs">
                    <div className='text-[#676767]'>{t("ClientPhoneNumber")}</div>
                    <div className='text-black-primary'>{props.phoneNumber}</div>
                </div>
            </div>
            <hr className='border border-b-[#E9E9E9]' />

            <div className="flex flex-col space-y-2">
                {props.cart?.map((good) => {
                    return <div className='flex flex-col space-y-1 text-xs text-black-primary'>
                        <div className="w-full uppercase">{good.name}</div>
                        <div className="flex flex-col items-end space-y-2 w-full">
                            <div className='flex space-x-5 flex-row uppercase w-full justify-end'>
                                <div>{`${good.sellingPrice} X ${good.count}.00`}</div>
                                <div className="w-[30%] text-end"> {`= ${(good.sellingPrice * good.count).toFixed(2)}`}  </div>
                            </div>
                            <div className='flex flex-row space-x-5 uppercase  w-full justify-end'>
                                <div>{t("NDS 12%")}</div>
                                <div className="w-[30%] text-end"> {`= ${(good.sellingPrice * good.count * 0.12).toFixed(2)}`}  </div>
                            </div>
                        </div>
                    </div>
                })}
            </div>

            <hr className='border border-b-[#E9E9E9]' />

            <div className="flex flex-col space-y-2 text-xs">
                <div className="flex justify-between w-full">
                    <div className="text-[#676767]">{props.totalGoods} {generateGoodCountText(props.totalGoods)}</div>
                    <div className='text-end text-black-priamry'>{`= ${props.totalSellingPrice?.toFixed(2)}`}</div>
                </div>
                <div className="flex justify-between w-full">
                    <div className="text-[#676767]">{t("Discount")}</div>
                    <div className='text-end text-black-priamry'>{`= ${props.totalDiscount?.toFixed(2)}`}</div>
                </div>
                <div className="flex justify-between w-full">
                    <div className="text-[#676767]">{t("Delivery")}</div>
                    <div className='text-end text-black-priamry'>{`= ${props.shippingPrice?.toFixed(2)}`}</div>
                </div>

            </div>
            <div className="flex justify-between text-sm text-black-primary font-medium">
                <div className='uppercase'>{t("Total")}</div>
                <div>{props.totalPrice?.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 }).replace(",", " ")}</div>
            </div>
            <div className='flex justify-center text-xs text-black-primary'>
                {t("Thanks for purchase!")}
            </div>

        </div>
    )
}