import { useMutation, useQueryClient } from "@tanstack/react-query"
import { updateCartItem } from "../services/updateCartItemService"
import type { UpdateCartItemVariables } from "../types/cart.types"

const useUpdateCartItem = () => {
    const queryClient = useQueryClient();

  return useMutation({
    mutationKey:["upadteCartItem"],
    mutationFn:({cartItemId, payload}: UpdateCartItemVariables) => updateCartItem(cartItemId, payload),
    onSuccess:() => {
        queryClient.invalidateQueries({
            queryKey:["cart"]
        })
    }
  })
}

export default useUpdateCartItem;
