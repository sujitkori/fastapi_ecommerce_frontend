import { useMutation, useQueryClient } from '@tanstack/react-query'
import { createPayment } from '../services/paymentService'
import type { createPaymentVariables } from '../types/payment.types'

const useCreatePayment = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey:["createPayment"],
    mutationFn: ({orderId, paymentData}:createPaymentVariables) => createPayment(orderId, paymentData),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey:["order", variables.orderId]
      });

      queryClient.invalidateQueries({
        queryKey:["orders"]
      })
    }
  })
}

export default useCreatePayment

// NOTE: variables is what we pass in Mutate.
// For example mutate({
//     orderId,
//     paymentData: {
//         payment_method: "UPI"
//     }
// })

// So variables consists of whole data.i.e.
// {
//     orderId,
//     paymentData: {
//         payment_method: "UPI"
//     }
// }