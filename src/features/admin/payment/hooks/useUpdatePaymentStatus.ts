import { useMutation, useQueryClient } from '@tanstack/react-query'
import type { UpdatePaymentStatusVariables } from '../../../payment/types/payment.types'
import { updatePaymentStatus } from '../services/adminPaymentService';



const useUpdatePaymentStatus = () => {
    const queryClient = useQueryClient();

  return useMutation({
    mutationKey:["updatePaymentStatus"],
    mutationFn: ({payment_id,payload}:UpdatePaymentStatusVariables) => updatePaymentStatus(payment_id, payload),
    onSuccess: () => {
        queryClient.invalidateQueries({
            queryKey:["adminPayments"]
        })

        queryClient.invalidateQueries({
            queryKey:["adminOrders"]
        })
    }
  })
}

export default useUpdatePaymentStatus
