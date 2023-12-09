import {GET_SUB_CATEGORIES_BY_CATEGORY} from "@/utils/constants";
import {Stack} from "@mui/material";
import {ISubCategoriesByCategoryResponse} from "@/types/Goods";
import {useTranslations} from "use-intl";
import {CustomBreadCrumb} from "@/components/Customs/CustomBreadCumb";
import {CategoryContent} from "@/components/Contents/CategoryContent";


async function getSubCategories(id : string) {
    const res = await fetch(`${process.env.NEXT_PUBLIC_URL}${GET_SUB_CATEGORIES_BY_CATEGORY}/${id}`);

    if (!res.ok) {
        // This will activate the closest `error.js` Error Boundary
        throw new Error(`Failed to fetch data ${res.status}  ${process.env.NEXT_PUBLIC_URL}${GET_SUB_CATEGORIES_BY_CATEGORY}/${id}`)

    }
    return res.json();
}



async function getParent(id : string) {
    const res = await fetch(`${process.env.NEXT_PUBLIC_URL}/category/${id}/parent`);

    if (!res.ok) {
        // This will activate the closest `error.js` Error Boundary
        throw new Error(`Failed to fetch data ${res.status}  ${process.env.NEXT_PUBLIC_URL}category/${id}/parent`)


    }
    return res.json();
}

const GoodByCategory = async ({params} : {
    params : {
        categoryId : string
    }
}) => {

    const data : ISubCategoriesByCategoryResponse = await getSubCategories(params.categoryId)

    const parent = await getParent(params.categoryId)
    const categoryName = parent?.categories[0]?.nameRu

    return <div>
        <CategoryContent data={data} title={categoryName}/>
    </div>
}


export default  GoodByCategory;