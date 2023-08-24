

import Image from "next/image";
import  AppStoreIcon from "@/public/icons/app-store.svg";
import PlusIcon from  "@/public/icons/plus.svg";
import MinusIcon from  "@/public/icons/minus.svg";

import {Button} from "@/components/Button";

import Loading from "@/app/loading";
import {Promo} from "@/components/Promo";
import {TabCategory} from "@/components/Customs/TabCategory";
import {HomeConent} from "@/components/Contents/HomeConent";
import {Suspense} from "react";


async function getGoods() {
    const res = await fetch(`${process.env.NEXT_PUBLIC_URL}/good/paged?pageIndex=0&pageSize=12`, );
    // The return value is *not* serialized
    // You can return Date, Map, Set, etc.

    if (!res.ok) {
        // This will activate the closest `error.js` Error Boundary
        throw new Error("Failed to fetch data");
    }

    return res.json();
}

async function getCategories() {
    const res = await fetch(`${process.env.NEXT_PUBLIC_URL}/category/paged?pageIndex=0&pageSize=12`,);
    // The return value is *not* serialized
    // You can return Date, Map, Set, etc.

    if (!res.ok) {
        // This will activate the closest `error.js` Error Boundary
        throw new Error("Failed to fetch data");
    }

    return res.json();
}




export default async function Home() {



    const goods = await getGoods()
    const categories = await getCategories()


    console.log(goods, " goods");



     return (<Suspense fallback={<Loading/>}>
          <div className="grid grid-cols-4 gap-4">
              <div>
                  <Promo photoPath={"https://images.adsttc.com/media/images/5d44/14fa/284d/d1fd/3a00/003d/large_jpg/eiffel-tower-in-paris-151-medium.jpg?1564742900"} text={"Для перекусов на работе и учёбе"}/>
              </div>
              <div>
                  <Promo photoPath={"https://images.adsttc.com/media/images/5d44/14fa/284d/d1fd/3a00/003d/large_jpg/eiffel-tower-in-paris-151-medium.jpg?1564742900"} text={"Для перекусов на работе и учёбе"}/>
              </div>
              <div>
                  <Promo photoPath={"https://images.adsttc.com/media/images/5d44/14fa/284d/d1fd/3a00/003d/large_jpg/eiffel-tower-in-paris-151-medium.jpg?1564742900"} text={"Для перекусов на работе и учёбе"}/>
              </div>
              <div>
                  <Promo photoPath={"https://images.adsttc.com/media/images/5d44/14fa/284d/d1fd/3a00/003d/large_jpg/eiffel-tower-in-paris-151-medium.jpg?1564742900"} text={"Для перекусов на работе и учёбе"}/>
              </div>

          </div>

             <HomeConent goods={goods} categories={categories}/>

      </Suspense>
  );
}
