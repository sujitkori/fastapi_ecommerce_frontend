import { useMutation, useQueryClient } from '@tanstack/react-query'
import { createReview } from '../services/createReviewService'
import type { createReviewVariables } from '../types/review.types'

const useCreateReview = () => {
    const queryClient = useQueryClient();

  return useMutation({
    mutationKey:["createReview"],
    mutationFn:({productId, reviewData}: createReviewVariables) => createReview(productId, reviewData),
    onSuccess: (_, variables) => {
        queryClient.invalidateQueries({
            queryKey:["reviews",variables.productId]
        });

        queryClient.invalidateQueries({
            queryKey:["product",variables.productId]
        })
    }
  })
}

export default useCreateReview;
