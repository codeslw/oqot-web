import {Skeleton, Stack} from "@mui/material";

export const CartItemsSkeleton = () => {

    const mockCartItems = new Array(6).fill(1);

    return <Stack spacing={0} width={"100%"}>
        {mockCartItems.map(item => (
            <div className={"flex space-x-6 items-center w-full py-6"}>
                <div className={"flex items-center space-x-4 w-1/2"}>
                    <Skeleton variant={"rectangular"} className={"min-w-[72px] h-[72px] rounded-lg !ml-0"}/>
                    <Stack width={"100%"} spacing={1}>
                    <Skeleton variant={"text"} width={"100%"}/>
                    <Skeleton variant={"text"} width={"90%"}/>
                    </Stack>
                </div>
                <Skeleton variant={"rectangular"}  className={"!min-w-[118px] h-10 rounded-xl"}/>
                <Stack spacing={1}>
                    <Skeleton width={132} height={24}/>
                    <Skeleton width={94} height={16}/>
                </Stack>
                <div className="flex items-center space-x-4">
                    <Skeleton variant={"rectangular"} width={24} height={24}/>
                    <Skeleton variant={"rectangular"} width={24} height={24}/>
                </div>
            </div>
        ))}
    </Stack>
}