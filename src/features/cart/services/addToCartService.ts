import apiClient from "../../../api/apiClient"
import type { AddToCartRequest, CartItemResponse } from "../types/cart.types";


export const addToCart = async (paylaod:AddToCartRequest):Promise<CartItemResponse> => {
    const response = await apiClient.post<CartItemResponse>('/cart/', paylaod);
    return response.data;
}