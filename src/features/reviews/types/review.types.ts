import type { UserProfileResponse } from "../../auth/types/user.types";

export interface ReviewRequest {
    rating:number;
    comment:string;
}

export interface ReviewResponse {
    id:number;
    user_id:number;
    user:UserProfileResponse;
    product_id:number;
    rating:number;
    comment:string;
    created_at:string | null;
    updated_at:string | null;
}

export interface createReviewVariables {
    productId:number;
    reviewData:ReviewRequest;
}

export interface UpdateReviewVariables {
  productId: number;
  reviewData: ReviewRequest;
}