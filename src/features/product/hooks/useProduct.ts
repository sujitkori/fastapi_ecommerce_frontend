import { useQuery } from "@tanstack/react-query"
import { getProduct } from "../services/productService"


const useProduct = (productId:number, enabled: boolean) => {
  return useQuery({
    queryKey:["product", productId],
    queryFn:() => getProduct(productId),
    enabled,
  })
}

export default useProduct
