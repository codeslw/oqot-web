"use client"
import {TabCategory} from "@/components/Customs/TabCategory";
import {useState} from "react";
import {Product} from "@/components/Customs/Product";


interface  IHomeContent {
    goods : any,
    categories : any
}

export const HomeConent : React.FC<IHomeContent> = ({goods, categories}) => {

    const [activeTab, setActiveTab] = useState<null | string>(null);

    return (
        <>
            <div className={"flex items-center mt-20"}>
                {[{name : "Все категории", id: null}].concat(categories?.data)?.slice(0, 6).map((item : any) => {
                    return  <TabCategory id={item.id} photoPath={item.imageUrl} isActive={activeTab === item.id} name={item.name} all={item.id === null}/>;
                })}
            </div>

            <div className="grid grid-cols-5 gap-5 mt-6">
                {goods.data.map((good :any) => {
                    return <Product name={good.nameRu} photoPath={good.photoPath}
                                    price={good.sellingPrice}
                                    discountedPrice={good.discount || 0} availableCount={good.count} discountPercent={good.discount}/>
                })}
            </div>

        </>
    );
};
