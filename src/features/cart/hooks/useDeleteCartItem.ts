import { useMutation, useQueryClient } from "@tanstack/react-query"
import { deleteCartItem } from "../services/deleteCartItemService"


const useDeleteCartItem = () => {
    const queryClient = useQueryClient();

  return useMutation({
    mutationKey:["deleteCartItem"],
    mutationFn:(cartItemId:number) => deleteCartItem(cartItemId),
    onSuccess:() => {
            queryClient.invalidateQueries({
                queryKey:["cart"]
            })
        },
  })
}

export default useDeleteCartItem
