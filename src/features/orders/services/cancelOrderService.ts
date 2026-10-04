import apiClient from "../../../api/apiClient"
import type { OrderResponse } from "../types/order.types";


export const cancelOrder = async (orderId:number): Promise<OrderResponse> => {
    const response = await apiClient.put<OrderResponse>(`/orders/${orderId}/cancel`);
    return response.data;
}