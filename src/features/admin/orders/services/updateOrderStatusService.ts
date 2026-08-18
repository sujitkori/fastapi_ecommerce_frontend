import apiClient from "../../../../api/apiClient";
import type { OrderResponse } from "../../../orders/types/order.types";
import type { UpdateOrderStatusRequest } from "../types/updateOrderStatus.types";

export const updateOrderStatus = async (orderId:number, payload:UpdateOrderStatusRequest):Promise<OrderResponse> => {
    const response = await apiClient.put<OrderResponse>(`/orders/${orderId}/status`, payload);
    return response.data;
}