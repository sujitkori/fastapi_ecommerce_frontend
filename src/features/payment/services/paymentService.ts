import apiClient from "../../../api/apiClient";
import type { CreatePaymentData, Payment } from "../types/payment.types";


export const createPayment = async (orderId:number, paymentData:CreatePaymentData):Promise<Payment> => {
    const response = await apiClient.post<Payment>(`/payment/${orderId}`, paymentData);
    return response.data;
}