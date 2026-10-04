import { useMutation, useQueryClient } from "@tanstack/react-query"
import { updateReview } from "../services/updateReviewService"
import type { UpdateReviewVariables } from "../types/review.types"

const useUpdateReview = () => {
    const queryClient = useQueryClient();

  return useMutation({
    mutationKey:["updateReview"],
    mutationFn:({productId, reviewData}:UpdateReviewVariables) => updateReview(productId, reviewData),
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

export default useUpdateReview
