import apiClient from "../../../api/apiClient"
import type { CartItemResponse, UpdateCartItemRequest } from "../types/cart.types"


export const updateCartItem = async (cartItemId:number, payload:UpdateCartItemRequest):Promise<CartItemResponse> => {
    const response = await apiClient.put<CartItemResponse>(`/cart/${cartItemId}`, payload);
    return response.data;
}