"use client"
import {Menu} from "@/components/Menu";
import {Popover, Stack} from "@mui/material";
import React, {ReactNode, useEffect, useState} from "react";
import RightChervonIcon from "../public/icons/right-chevron-mini.svg";
import Image from "next/image";
import {ICategory} from "@/types/common";
import {CustomMenuItem} from "@/components/Customs/CustomMenuItem";

interface INestedMenu {
    open : boolean
    onClose : () => void,
    options : IMenuOption[],
    id : string,
    anchorElement : any

}

interface IMenuOption {
    name : string,
    Icon?: () => ReactNode,
    imgUrl?  : string
    id : string,
    children : any[]
}



export const NestedMenu:React.FC<INestedMenu> = ({open, options, id, anchorElement ,onClose }) => {

    const [anchorChild, setAnchorChild] = useState<HTMLDivElement | null>(null);
    const [currentChildren, setCurrentChildren] = useState<IMenuOption["children"] | null>(null);

    const handleOpenChildren = (event : React.MouseEvent<HTMLDivElement>) => {
        if(anchorChild) {
            setAnchorChild(null);
        }
        else {
            setAnchorChild(event.currentTarget);
        }
    };


    const handleCloseMenu = () => {
        setCurrentChildren(null);
        onClose()
    }

    return (
        <>
        <Menu id = {id}
              open={open}
              onClose={handleCloseMenu}
              anchorOrigin={{
                vertical : "bottom",
                horizontal : "left"
                }}
              transformOrigin={{
                  vertical : "top",
                  horizontal : "left"
              }}
              elevation={1}
              anchorEl={anchorElement}
              disableRestoreFocus
              classes={{
                  paper : "flex relative w-max p-3"
              }}
        >
        <Stack spacing={2}  width={"max-content"} maxHeight={"20rem"} overflow={"auto"} aria-describedby={"children"}>
            {options?.map((item) => {
                return (<>
                    <CustomMenuItem
                        onMouseOver={(e) => {
                            handleOpenChildren(e);
                            setCurrentChildren([...item.children]);
                        }}>
                        <div className={"flex items-center space-x-4"}>
                            {item.imgUrl ? <Image src={item.imgUrl} width={24} height={24} alt={""}/> : item.Icon ? <item.Icon/> : null}
                            <div className={"text-base-bold grow-1"}>{item.name}</div>
                        </div>
                        <RightChervonIcon className={"ml-auto fill-gray-secondary"}/>
                    </CustomMenuItem>
                    </>);
            })}
        </Stack>
            {currentChildren?.length ? <Stack spacing={2} height={"20rem"} width={"max-content"} minWidth={"15rem"} p={1}>
                {currentChildren?.map((item) => {
                    return <CustomMenuItem
                        onClick={() => onClose()}
                        link={`/category/${item.parentId}?childId=${item.id}`}>
                        <div className="text-base-light">
                            {item.name}
                        </div>
                    </CustomMenuItem>;
                })}
            </Stack> : null}
        </Menu>

        </>
    );
};
