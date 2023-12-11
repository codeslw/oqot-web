"use client";
import {TabCategory} from "@/components/Customs/TabCategory";
import {useEffect, useState} from "react";
import {Product} from "@/components/Customs/Product";
import ChervonDownIcon from  "@/public/icons/down-chevron.svg";
import ChervonRightIcon from  "@/public/icons/right-chevron.svg";
import {Menu} from "@/components/Menu";
import Image from "next/image";
import {IPromoCategoryGoods} from "@/types/Goods";
import {Modal} from "@/components/Modal";
import {Box, Stack, Typography} from "@mui/material";
import {Input} from "@/components/Input";
import {Button} from "@/components/Button";
import {YandexMap} from "@/components/Customs/YandexMap";
import {Popup} from "@/components/Customs/Popup";
import {AddressModalContent} from "@/components/Puzzles/AddressModalContent";
import {MobileAddressContent} from "@/components/Mobile/MobileAddressContent";
import {MobileLanguageContent} from "@/components/Mobile/MobileLanguageContent";
import {observer} from "mobx-react-lite";
import uistore from "@/utils/stores/UIStore";
import {ICategory, IStateCart, TCategories} from "@/types/common";
import {CategoriesMenuContent} from "@/components/Puzzles/CategoriesMenuContent";
import {useTranslations} from "use-intl";
import {useMutationApi} from "@/hooks/useMutationApi";
import cartStore from "@/utils/stores/CartStore";
import {useQueryApi} from "@/hooks/useQueryApi";
import {useSynchronizeCart} from "@/hooks/useSynchronizeCart";
import {ProductContent} from "@/components/Contents/ProductContent";
import {GoodListWrapper} from "@/components/Wrappers/GoodListWrapper";

interface  IHomeContent {
    categories : TCategories,
    promoCategoryGoods : IPromoCategoryGoods
}

export const HomeConent : React.FC<IHomeContent> = observer(({categories, promoCategoryGoods}) => {

    const t = useTranslations("HomeContent");

    const [activeTab, setActiveTab] = useState<null | string>(null);
    const [openPickLocationModal, setOpenPickLocationModal] = useState(true);
    const [openPickLanguageModal, setOpenPickLanguageModal] = useState(false);
    const [anchorEl, setAnchorEl] = useState<HTMLDivElement | null>(null);
    const replaceCartContent = useMutationApi<unknown,IStateCart[]>("/goodtocart/many","put",{});
    const [activeGoodId, setActiveGoodId] = useState<string | null>(null);
    const handleMouseOver = (event: React.MouseEvent<HTMLDivElement>) => {
        if(anchorEl) {
            setAnchorEl(null);
        }
        else {

            setAnchorEl(event.currentTarget);
        }
    };

    const handleClosePopover = () => {
        setAnchorEl(null);
    };





    const handleChangeLanguage = (key : string) => {

    };

    return (
        <>
            <div className={"flex items-center mt-20 overflow-x-auto justify-between no-scrollbar"}>
                <TabCategory id={""} photoPath={""} name={"Все"} all={true} isActive={activeTab === ""}/>
                {categories.mainCategories?.slice(0, 4).map((item : ICategory) => {
                    return  <TabCategory id={item.id} photoPath={item.imageUrl} isActive={activeTab === item.id} name={item.name} all={item.id === null}/>;
                })}
                <div
                    onClick={handleMouseOver}
                    className="flex items-center space-x-2 text-base-bold-gray py-4 px-6 cursor-pointer rounded-[4rem] hover:bg-white">
                    <div>{t("more")}</div>
                    <ChervonDownIcon className={"fill-gray-secondary dark:fill-gray-secondary-dark"}/>
                </div>
                <Menu onClose={handleClosePopover} open={!!anchorEl} id={"location"}  elevation={1} anchorEl={anchorEl} disableRestoreFocus>
                    <CategoriesMenuContent data={categories?.mainCategories}/>
                </Menu>
            </div>
            <div className="flex flex-col space-y-14 mt-14">
                {
                    promoCategoryGoods?.promoCategories.filter((item) => item.goods.length > 0).map((item) => {
                        return (
                          <GoodListWrapper title={item.promoCategory.nameRu} path={`/promocategory/${item.promoCategory.id}`}>
                                    {item.goods?.map((good) => {
                                        return <Product id={good.id}
                                                        name={good.nameRu}
                                                        photoPath={good.photoPath}
                                                        price={good.sellingPrice}
                                                        discountedPrice={good.sellingPrice * (1 - good.discount)}
                                                        availableCount={good.count}
                                                        discountPercent={good.discount}
                                                        onClick={() => setActiveGoodId(good.id)}
                                        />;
                                    })}
                          </GoodListWrapper>
                        );
                    })

                }
            </div>
            <Popup
                className={"sm:hidden"}
                anchor={"bottom"}
                onOpen={() => uistore.openMobileAddressPopup()}
                onClose={() => uistore.closeMobileAddressPopup()}
                open={uistore.isMobileAddressPopupOpen}>
                <MobileAddressContent/>
            </Popup>
            <Popup
                className={"sm:hidden"}
                anchor={"bottom"}
                onOpen={() => uistore.openMobileLanguagePopup()}
                onClose={() => uistore.closeMobileLanguagePopup()}
                open={uistore.isMobileLanguagePopupOpen}>
                <MobileLanguageContent onChange={handleChangeLanguage}/>
            </Popup>
            <Modal
                open={uistore.isMobileAddressPopupOpen}
                className={"hidden sm:block"}
                onCloseIconClicked={() => uistore.closeMobileAddressPopup()}
                onClose={() => uistore.closeMobileAddressPopup()}
            >
            <AddressModalContent onClose={() => uistore.closeMobileAddressPopup()}/>
            </Modal>
            {/*{!!activeGoodId && <ProductContent open={!!activeGoodId} onClose={() => setActiveGoodId(null)} goodId={activeGoodId ?? ""}/>}*/}
        </>
    );
});
