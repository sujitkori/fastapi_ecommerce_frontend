import { useMutation, useQueryClient } from '@tanstack/react-query'
import { updateOrderStatus } from '../services/updateOrderStatusService'
import type { UpdateOrderStatusVariables } from '../types/updateOrderStatus.types'

const useUpdateOrderStatus = () => {
    const queryClient = useQueryClient();

  return useMutation({
    mutationKey:["updateOrderStatus"],
    mutationFn: ({orderId, payload}: UpdateOrderStatusVariables) => updateOrderStatus(orderId, payload),
    onSuccess:() => {
        queryClient.invalidateQueries({
            queryKey:["adminOrders"]
        })
    }
  })
}

export default useUpdateOrderStatus
