import { useQuery } from '@tanstack/react-query'
import { getCart } from '../services/getCartService'
const useCart = () => {
  return useQuery({
    queryKey:["cart"],
    queryFn:getCart
  })
}

export default useCart
