import {Skeleton} from "@mui/material";


interface ICustomBreadCrumbSkeleton {
    length: number;
}
export const CustomBreadCrumbSkeleton : React.FC<ICustomBreadCrumbSkeleton> = ({length}) => {

    return <div className={"flex space-x-1 w-full"}>
        {new Array(length).fill(1).map((item, index) => {
            return <div className={"flex space-x-1"}>
                <Skeleton width={100} variant={"text"}/>
                {index!== length - 1 && <Skeleton height={20} width={20}/>}
            </div>
        })}
    </div>
}