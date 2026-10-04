import { useQuery } from '@tanstack/react-query'
import { getOrders } from '../services/getOrdersService'

const useOrders = () => {
  return useQuery({
    queryKey:["orders"],
    queryFn:getOrders
  })
}

export default useOrders
