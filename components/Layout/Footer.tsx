"use client"
import Playmarket from '@/public/icons/google-play.svg'
import AppSotre from '@/public/icons/app-store.svg'
import {Button} from "@/components/Button";
import {useTranslations} from "use-intl";
import Link from "next/link";
import LogoIcon from "@/public/icons/logo.svg";
import {SUPPORT_PHONE_NUMBER} from "@/utils/constants";
import InstagramIcon from  "@/public/icons/instagram (.svg"
import FacebookIcon from  "@/public/icons/facebook.svg"
import TelegramIcon from  "@/public/icons/telegram.svg"

export const Footer = () => {

    const t = useTranslations("Footer")

    return <footer className="max-w-[100vw] px-8 py-5 flex flex-col space-y-6 overflow-hidden">
        <div className="w-full flex justify-between items-center">
            <Link href={"/"}>
                <LogoIcon
                    className="hidden md:block fill-black-primary dark:fill-white text-white dark:text-black-primary cursor-pointer"/>
            </Link>
            <div className="flex space-x-4">
                <Button theme={"tertiary"} text={""} startIcon={<Playmarket/>}>{
                    <Link target={"_blank"} href={"https://play.google.com/store/apps/details?id=uz.oqot.app&hl=ru&gl=US"} className={"flex flex-col -space-y-1"}>
                        <div className="text-xs-light">{t("Accessible in")}</div>
                        <div className="text-base-bold">{t("Google Play")}</div>
                    </Link>
                }</Button>
                <Button  theme={"tertiary"} text={""} startIcon={<AppSotre/>}>{
                    <Link target={"_blank"} href={"https://apps.apple.com/uz/app/oq-ot-delivery-in-tashkent/id6443429151"} className={"flex flex-col -space-y-1"}>
                        <div className="text-xs-light">{t("Accessible in")}</div>
                        <div className="text-base-bold">{t("App Store")}</div>
                    </Link>
                }</Button>
            </div>
        </div>
        <div className="flex justify-between items-center">
            <div className="flex items-center space-x-4">
                <div className="text-base-light">
                    {t("OQ-OT 2023_text")}
                </div>
                <div className={"w-1 h-1 rounded-full bg-black-primary"}></div>
                <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0  sm:space-x-3">
                    <div className="text-base-light">
                        {t("Tech support")}
                    </div>
                    <div className={"text-base-bold"}>{SUPPORT_PHONE_NUMBER}</div>
                </div>
            </div>
            <div className="flex flex-col sm:flex-row items-center space-y-2 sm:space-x-2 sm:space-y-0">
                <Link href={'https://www.instagram.com/oqotuz?igsh=NnlxemprNDhidGRl'} className={'p-4 flex-center'} target={"_blank"}>
                    <InstagramIcon/>
                </Link>
                <Link href={'https://t.me/oqotbot'} target={"_blank"} className={'p-4 flex-center'}>
                    <TelegramIcon/>
                </Link>
                <Link href={'https://www.facebook.com/oqot.uz?locale=ru_RU'} className={'p-4 flex-center'} target={"_blank"}>
                    <FacebookIcon/>
                </Link>
            </div>
        </div>
    </footer>
}