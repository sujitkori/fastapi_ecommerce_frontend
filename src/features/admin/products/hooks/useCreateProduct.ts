import { useMutation, useQueryClient } from '@tanstack/react-query'
import type { ProductCreateFormData } from '../types/productForm.types'
import { createProduct } from '../services/createProductService'

const useCreateProduct = () => {
    const queryClient = useQueryClient();

  return useMutation({
    mutationKey:["createProduct"],
    mutationFn:(productData:ProductCreateFormData) => createProduct(productData),
    onSuccess: () => {
        queryClient.invalidateQueries({
            queryKey:["adminProducts"]
        })
    }
  })
}

export default useCreateProduct
