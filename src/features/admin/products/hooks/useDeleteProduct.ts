import { useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from 'sonner';
import { deleteProduct } from '../services/deleteProductService';

const useDeleteProduct = () => {
    const queryClient = useQueryClient();

  return useMutation({
    mutationKey:["deleteProduct"],
    mutationFn:(productId:number) => deleteProduct(productId),
    onSuccess: (data) => {
        toast.success(data.message);
        
        queryClient.invalidateQueries({
            queryKey:["adminProducts"]
        })
    }
  })
}

export default useDeleteProduct;
