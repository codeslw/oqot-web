import {usePathname, useRouter, useSearchParams} from "next/navigation";
import {useCallback} from "react";

export const useQueryParams = () => {

    const router = useRouter()
    const pathname = usePathname()
    const searchParams = useSearchParams()!

    // Get a new searchParams string by merging the current
    // searchParams with a provided key/value pair
    const createQueryString = useCallback(
        (name: string, value: string) => {
            const params = new URLSearchParams(searchParams as any)
            params.set(name, value)
            return params.toString()
        },
        [searchParams]
    )

    const deleteQueryParam = useCallback((name : string) => {
        const params = new URLSearchParams(searchParams as any)
        params.delete(name);
        return params.toString()
    },
        [searchParams]
    )
    return {
        createQueryString,
        deleteQueryParam
    }
}