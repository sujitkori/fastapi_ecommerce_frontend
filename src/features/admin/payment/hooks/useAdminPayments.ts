import { useQuery } from '@tanstack/react-query'
import { getAllAdminPayments } from '../services/adminPaymentService'

const useAdminPayments = () => {
  return useQuery({
    queryKey:["adminPayments"],
    queryFn:getAllAdminPayments
  })
}

export default useAdminPayments
