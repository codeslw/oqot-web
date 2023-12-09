import {GET_PROMOCATEGORIES_PAGED, GET_SUB_CATEGORIES_BY_CATEGORY} from "@/utils/constants";
import {Stack} from "@mui/material";
import {ISubCategoriesByCategoryResponse} from "@/types/Goods";
import {CategoryContent} from "@/components/Contents/CategoryContent";
import {PromocategoryContent} from "@/components/Contents/PromocategoryContent";


async function getSubCategories(id : string) {
    const res = await fetch(`${process.env.NEXT_PUBLIC_URL}${GET_PROMOCATEGORIES_PAGED}/${id}`);

    if (!res.ok) {
        // This will activate the closest `error.js` Error Boundary
        throw new Error(`Failed to fetch data ${res.status}  ${process.env.NEXT_PUBLIC_URL}${GET_PROMOCATEGORIES_PAGED}/${id}`)

    }
    return res.json();
}



async function getParents() {
    const res = await fetch(`${process.env.NEXT_PUBLIC_URL}/good/main/promo?pageSize=4`);


    if (!res.ok) {
        // This will activate the closest `error.js` Error Boundary
        throw new Error(`Failed to fetch data ${res.status}`)


    }
    return res.json();
}

const GoodByCategory = async ({params} : {
    params : {
        promocategoryId : string
    }
}) => {

    const data : ISubCategoriesByCategoryResponse = await getSubCategories(params.promocategoryId)

    const parents : any = await getParents()
    const categoryName = parents?.promoCategories?.find((item : any) => Number(item.promoCategory.id) === Number(params.promocategoryId))?.promoCategory?.name





    return <div>
        <PromocategoryContent data={data} title={categoryName}/>
    </div>
}


export default  GoodByCategory;