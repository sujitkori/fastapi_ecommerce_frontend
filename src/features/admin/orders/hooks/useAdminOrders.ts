import { useQuery } from "@tanstack/react-query"
import { getAdminOrders } from "../services/adminOrderService"

const useAdminOrders = () => {
  return useQuery({
    queryKey:["adminOrders"],
    queryFn:getAdminOrders
  })
}

export default useAdminOrders;
