import apiClient from "../../../api/apiClient"
import type { ReviewRequest, ReviewResponse } from "../types/review.types"


export const updateReview = async (productId:number, reviewData:ReviewRequest):Promise<ReviewResponse> => {
    const response = await apiClient.put<ReviewResponse>(`/products/${productId}/reviews`, reviewData);
    return response.data;
}