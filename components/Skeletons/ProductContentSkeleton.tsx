import {Grid, Skeleton, Stack} from "@mui/material";
import Image from "next/image";
import HeartFilledIcon from "@/public/icons/heart-filled.svg";
import HeartIcon from "@/public/icons/heart.svg";
import {CustomBreadCrumb} from "@/components/Customs/CustomBreadCumb";
import {formatPrice} from "@/utils/services";
import {Button} from "@/components/Button";
import AttentionIcon from "@/public/icons/circle-attention.svg";
import RightChervonIcon from "@/public/icons/right-chevron.svg";
import {CustomBreadCrumbSkeleton} from "@/components/Skeletons/CustomBreadCrumbSkeleton";

export const ProductContentSkeleton = () => {
    return <div className={"w-full h-full"}>
        <Stack direction={"column"} spacing={7}>
            <Grid container>
                <Grid item xs={12} md={6} lg={4}>
                    <div className={"w-[320px] h-[320px] relative p-4"}>
                        <Skeleton variant="rectangular" className={"w-full h-full rounded-2xl"} />
                    </div>
                </Grid>
                <Grid item xs={12} md={6} lg={8} className={"flex justify-end"}>
                    <Stack direction={"column"} spacing={3} width={"90%"}>
                        <div className="flex space-y-5 flex-col">
                            <div className="flex space-y-3 flex-col">
                                <CustomBreadCrumbSkeleton length={3} />
                                <Stack spacing={0.5}>
                                    <Skeleton variant="text" width={"100%"} height={30} />
                                    <Skeleton variant="text" width={"80%"} height={30} />
                                </Stack>
                            </div>
                            <div className="w-max rounded-2xl bg-green-background text-base-bold text-white flex-center px-3 py-0.5">
                                <Skeleton variant="text" width={80} />
                            </div>
                        </div>
                        <div className="flex space-x-3 items-end">
                            <Skeleton variant="text" width={120} />
                            <Skeleton variant="text" width={50} sx={{fontSize : "0.8rem"}}/>
                        </div>
                        <div className="w-1/2">
                            <Skeleton variant={"rectangular"} width={"70%"} className={"rounded-2xl"} height={56}/>
                        </div>
                        <div className="flex flex-col space-y-2">
                            <div className="text-base-light-gray">
                                <Skeleton variant={"text"} width={80}/>
                            </div>
                            <div className={"flex flex-col space-y-[1px]"}>
                                <Skeleton variant={"text"} width={"100%"}/>
                                <Skeleton variant={"text"} width={"100%"}/>
                                <Skeleton variant={"text"} width={"100%"}/>
                                <Skeleton variant={"text"} width={"100%"}/>
                                <Skeleton variant={"text"} width={"30%"}/>
                            </div>
                        </div>
                        <div className="text-base-light">
                            <Skeleton variant={"text"} width={130}/>
                        </div>
                        <Skeleton variant={"rectangular"} width={"70%"} height={80} className={"rounded-2xl"}/>
                    </Stack>
                </Grid>
            </Grid>
            <Stack direction={"column"} spacing={3}>
                <div className="w-full flex justify-between">
                    <Skeleton />
                    <div className="text-base-bold-gray flex items-center space-x-2">
                        <div>
                            <Skeleton variant = "text" sx={{fontSize : "32px"}} />
                            <RightChervonIcon/>
                        </div>
                    </div>
                </div>

            </Stack>

        </Stack>
    </div>
}