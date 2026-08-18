import apiClient from "../../../api/apiClient"
import type { OrderResponse } from "../types/order.types";


export const getOrders = async (): Promise<OrderResponse[]> => {
    const response = await apiClient.get<OrderResponse[]>('/orders/');
    return response.data;
}