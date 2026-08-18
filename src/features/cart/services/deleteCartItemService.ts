import apiClient from "../../../api/apiClient"
import type { DeleteCartItemResponse } from "../types/cart.types";

export const deleteCartItem = async (cartItemId:number):Promise<DeleteCartItemResponse> => {
    const response = await apiClient.delete<DeleteCartItemResponse>(`/cart/${cartItemId}`);
    return response.data;
}