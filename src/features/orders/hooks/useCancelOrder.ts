import { useMutation, useQueryClient } from '@tanstack/react-query'
import { cancelOrder } from '../services/cancelOrderService'

const useCancelOrder = () => {
    const queryClient = useQueryClient();

  return useMutation({
    mutationKey:["cancelOrder"],
    mutationFn:(orderId:number) => cancelOrder(orderId),
    onSuccess:() => {
        queryClient.invalidateQueries({
            queryKey:["orders"]
        });

        queryClient.invalidateQueries({
            queryKey:["order"]
        });
    }
  })
}

export default useCancelOrder;
