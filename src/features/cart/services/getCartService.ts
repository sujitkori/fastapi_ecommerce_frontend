import apiClient from "../../../api/apiClient"
import type { CartItemResponse } from "../types/cart.types";


export const getCart = async ():Promise<CartItemResponse[]> => {
    const response = await apiClient.get<CartItemResponse[]>('/cart/');
    return response.data;
}