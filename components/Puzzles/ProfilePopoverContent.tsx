"use client"
import {Avatar, CircularProgress, Stack} from "@mui/material";
import {useMemo} from "react";
import {useTranslations} from "use-intl";
import  Bill from "@/public/icons/bill.svg"
import  Heart from "@/public/icons/heart.svg"
import  LocationPin from "@/public/icons/mappin.svg"
import  CreditCard from "@/public/icons/credit-card.svg"
import  Ticket from "@/public/icons/ticket.svg"
import  Users from "@/public/icons/users.svg"
import CirclePin from "@/public/icons/circle-info.svg"
import Logout from "@/public/icons/log-out.svg"
import {useQueryApi} from "@/hooks/useQueryApi";
import {UseQueryResult} from "@tanstack/react-query";
import {AxiosResponse} from "axios";
import {Button} from "@/components/Button";
import ShieldTickIcon from "@/public/icons/shield-tick.svg"
import ShieldMinusIcon from "@/public/icons/shield-minus.svg"
import HourGlassIcon from "@/public/icons/hourglass.svg"
import {el} from "date-fns/locale";
import {Text} from "domelementtype";
import {useRouter} from "next/navigation";
import UIStore from "@/utils/stores/UIStore";


interface IProfile {
    "id": string,
    "user": {
        "id": string,
        "login":string,
        "firstName": string,
        "lastName": string,
        "middleName": null,
        "sex": number,
        "birthday": string,
        "avatarPhotoPath": string
    },
    "phoneNumber":string,
    "passportPhotoPath": string | null,
    "selfieWithPassportPhotoPath": string | null,
    "isPassportVerified": boolean,
    "isPassportPending": boolean,
    "balance": boolean | number,
    "addresses": any,
    "cards": any
}

interface IProps {
   onClose : (e: React.MouseEvent) => void
}

export const ProfilePopoverContent = (props : IProps) => {

    const t = useTranslations('Profile')
    const router = useRouter()
    const profile : UseQueryResult<AxiosResponse<IProfile>, any> = useQueryApi('/profile/client', {}, {})

    const profileMenu = useMemo(() => {
            return [
                {
                    title : t("My orders"),
                    icon : <Bill  className={"fill-inherit"}/>,
                    path : "/order/list"
                },
                {
                    title : t("Favourites"),
                    icon : <Heart className={"fill-inherit"}/>
                },
                {
                    title : t("My Addresses"),
                    icon : <LocationPin className={"fill-inherit"}/>,
                    handler : () => UIStore.setIsAddressListOpen(true)
                },
                {
                    title : t("My bank cards"),
                    icon : <CreditCard className={"fill-inherit"}/>,
                    handler : () => UIStore.setIsCardListOpen(true)
                },
                {
                    title : t("My promos"),
                    icon : <Ticket className={"fill-inherit"}/>
                },
                {
                    title : t("Vacancies"),
                    icon : <Users className={"fill-inherit"}/>
                },
                {
                    title : t("About service"),
                    icon : <CirclePin className={"fill-inherit"}/>
                }

            ]
    }, []);


    const verificationStatus = useMemo(() => {
        if (profile.data?.data?.isPassportVerified) {
            return {
                title : t("Verified"),
                icon : <ShieldTickIcon className={"fill-inherit"}/>,
                textClassName : "text-xs-bold text-green-text",
                status : 0

            }
        }
        else if (profile.data?.data?.isPassportPending && profile.data?.data?.isPassportVerified === false) {
            return {
                title : t("Pending"),
                icon : <HourGlassIcon className={"fill-inherit"}/>,
                textClassName : "text-xs-bold text-orange-default",
                status: 1,

            }
        }
        else if (profile.data?.data?.isPassportPending === false && profile.data?.data?.isPassportVerified === false) {
            return {
                title : t("Not verified"),
                icon : <ShieldMinusIcon className={"fill-inherit"}/>,
                textClassName : "text-xs-bold text-red-default",
                status: 2,

            }
        }
        else {
            return {
                title : t("Not verified"),
                icon : <ShieldMinusIcon className={"fill-inherit"}/>,
                textClassName : "text-xs-bold text-red-default",
                status: 2,
            }
        }
    }, [profile]);

    // if(profile.isLoading) return  <div className={"w-[352px] h-[600px] flex justify-center items-center"}>
    //     <CircularProgress className={"text-orange-default"} />
    // </div>

    return <Stack spacing={0} className={"no-scrollbar"}>
        <div className="flex space-x-4 items-start px-4 py-3">
            <Avatar src={profile?.data?.data?.user?.avatarPhotoPath} className={"w-14 h14"}/>
            <div className="flex flex-col space-y-2">
                <div className="flex flex-col">
                    <div className="text-base-bold">
                        {`${profile.data?.data?.user?.firstName} ${profile.data?.data?.user?.lastName}`}
                    </div>
                    <div className="text-xs-light-gray">
                        {profile.data?.data?.phoneNumber}
                    </div>
                </div>
                <div className={`flex space-x-0 items-center ${verificationStatus.status === 0 ? "fill-green-text" : verificationStatus.status === 1 ? "fill-orange-default" : "fill-red-default"}`}>
                    {verificationStatus.icon}
                    <div className={verificationStatus.textClassName}>
                        {verificationStatus.title}
                    </div>
                </div>
            </div>
        </div>

        {
            profileMenu.map((item, index : number) => {
                return <div
                    onClick={() => item.path ? router.push(item.path) : item.handler ?  item.handler() : null}
                    className={"flex px-4 py-3 cursor-pointer space-x-4 text-black-primary hover:text-blue-text fill-black-primary hover:fill-blue-text"}>
                    {item.icon}
                    <div className="text-base-bold text-inherit">
                        {item.title}
                    </div>
                </div>
            })
        }
        <div className="px-4 py-3">
            <Button theme={"tertiary"} text={t('Logout')} extraClasses={"w-full"} startIcon={<Logout/>}/>
        </div>
    </Stack>
}