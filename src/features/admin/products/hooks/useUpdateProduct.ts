import { useMutation, useQueryClient } from '@tanstack/react-query'
import { updateProduct } from '../services/updateProductService'
import type { UpdateProductVariables } from '../types/productForm.types'

const useUpdateProduct = () => {
    const queryClient = useQueryClient();

  return useMutation({
    mutationKey:["updateProduct"],
    mutationFn:({productId, productData}:UpdateProductVariables) => updateProduct(productId, productData),
    onSuccess: () => {
        queryClient.invalidateQueries({
            queryKey:["adminProducts"]
        })
    }
  })
}

export default useUpdateProduct
