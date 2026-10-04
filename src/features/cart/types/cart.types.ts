import type { Product } from "../../product/types/product.types";

export interface AddToCartRequest {
    product_id: number;
    quantity: number;
}

export interface CartItemResponse {
    id: number;
    user_id: number;
    product_id: number;
    quantity: number;
    product: Product | null;
    created_at: string | null;
    updated_at: string | null;
}


export interface UpdateCartItemRequest {
    quantity: number;
}

export type UpdateCartItemVariables = {
  cartItemId: number;
  payload: UpdateCartItemRequest;
};

export interface DeleteCartItemResponse {
    message: string;
}