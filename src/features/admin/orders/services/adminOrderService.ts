import apiClient from "../../../../api/apiClient";
import type { AdminOrderResponse } from "../types/adminOrder.types";

export const getAdminOrders = async ():Promise<AdminOrderResponse[]> => {
    const response = await apiClient.get<AdminOrderResponse[]>('/admin/orders');
    return response.data;
}