import apiClient from "../../../api/apiClient"
import type { OrderResponse } from "../types/order.types";

export const createOrder = async (): Promise<OrderResponse> => {
    const response = await apiClient.post<OrderResponse>('/orders/');
    return response.data;
}