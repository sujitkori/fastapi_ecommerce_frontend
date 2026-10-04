import apiClient from "../../../../api/apiClient"
import type { Payment, UpdatePaymentStatus } from "../../../payment/types/payment.types";


export const getAllAdminPayments = async ():Promise<Payment[]> => {
    const response = await apiClient.get<Payment[]>("/payment/admin/");
    return response.data;
}

export const updatePaymentStatus = async (payment_id:number, payload:UpdatePaymentStatus):Promise<Payment> => {
    const response = await apiClient.put<Payment>(`/payment/${payment_id}/status/`, payload)
    return response.data;
}