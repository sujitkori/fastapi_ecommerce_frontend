import { useMutation, useQueryClient } from '@tanstack/react-query'
import { createOrder } from '../services/CreateOrderService'

const useCreateOrder = () => {
    const queryClient = useQueryClient();

  return useMutation({
    mutationKey:["createOrder"],
    mutationFn:createOrder,
    onSuccess:() => {
        queryClient.invalidateQueries({
            queryKey:["cart"]
        });

        queryClient.invalidateQueries({
            queryKey:["orders"]
        });
    }
  })
}

export default useCreateOrder
