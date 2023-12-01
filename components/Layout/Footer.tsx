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

    return <footer className="px-8 py-5 flex flex-col space-y-6">
        <div className="w-full flex justify-between items-center">
            <Link href={"/"}>
                <LogoIcon
                    className="hidden md:block fill-black-primary dark:fill-white text-white dark:text-black-primary cursor-pointer"/>
            </Link>
            <div className="flex space-x-4">
                <Button theme={"tertiary"} text={""} startIcon={<Playmarket/>}>{
                    <div className={"flex flex-col -space-y-1"}>
                        <div className="text-xs-light">{t("Accessible in")}</div>
                        <div className="text-base-bold">{t("Google Play")}</div>
                    </div>
                }</Button>
                <Button theme={"tertiary"} text={""} startIcon={<AppSotre/>}>{
                    <div className={"flex flex-col -space-y-1"}>
                        <div className="text-xs-light">{t("Accessible in")}</div>
                        <div className="text-base-bold">{t("App Store")}</div>
                    </div>
                }</Button>
            </div>
        </div>
        <div className="flex justify-between items-center">
            <div className="flex items-center space-x-4">
                <div className="text-base-light">
                    {t("OQ-OT 2023_text")}
                </div>
                <div className={"w-1 h-1 rounded-full bg-black-primary"}></div>
                <div className="flex space-x-3">
                    <div className="text-base-light">
                        {t("Tech support")}
                    </div>
                    <div className={"text-base-bold"}>{SUPPORT_PHONE_NUMBER}</div>
                </div>
            </div>
            <div className="flex items-center space-x-2">
                <Link href={''} className={'p-4 flex-center'}>
                    <InstagramIcon/>
                </Link>
                <Link href={''} className={'p-4 flex-center'}>
                    <TelegramIcon/>
                </Link>
                <Link href={''} className={'p-4 flex-center'}>
                    <FacebookIcon/>
                </Link>
            </div>
        </div>
    </footer>
}