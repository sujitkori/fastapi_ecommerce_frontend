import { useMutation, useQueryClient } from '@tanstack/react-query'
import { addToCart } from '../services/addToCartService'


const useAddToCart = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ["add-cart"],
    mutationFn:addToCart,
    onSuccess:() => {
      queryClient.invalidateQueries({
        queryKey:["cart"]
      })
    }
  })
}

export default useAddToCart;
