import apiClient from "../../../api/apiClient"
import type { OrderResponse } from "../types/order.types";


export const getSingleOrder = async (orderId:number): Promise<OrderResponse> => {
    const response = await apiClient.get<OrderResponse>(`/orders/${orderId}`);
    return response.data;
}