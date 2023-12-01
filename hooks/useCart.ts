import CartStore from "@/utils/stores/CartStore";
import {useMutationApi} from "@/hooks/useMutationApi";
import {useQueryClient} from "@tanstack/react-query";


export const useCart = () => {

    const queryClient = useQueryClient()
    const updateCart = useMutationApi("/goodtocart/many", "put", {})
    const clearCart = async () => {
        CartStore.setCart([]);
        try {
            const response = await updateCart.mutateAsync([]);
            if (response.status < 400) {
                queryClient.invalidateQueries(["/goodtocart"])
            }
        }
        catch (err) {

        }
    }


    return {
        clearCart,
    }
}