import apiClient from "../../../api/apiClient"
import type { ReviewResponse } from "../types/review.types";

export const getReviews = async (productId: number):Promise<ReviewResponse[]> => {
    const response = await apiClient.get<ReviewResponse[]>(`/products/${productId}/reviews`);
    return response.data;
} 