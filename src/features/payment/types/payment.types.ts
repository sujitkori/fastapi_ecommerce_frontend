export type PaymentMethod =
  | "cash"
  | "upi"
  | "credit_card"
  | "debit_card";

export type PaymentStatus =
  | "pending"
  | "success"
  | "failed"
  | "refunded";

export interface CreatePaymentData {
  payment_method: PaymentMethod;
}

export interface Payment {
  id: number;
  order_id: number;
  amount: number;
  payment_method: PaymentMethod;
  payment_status: PaymentStatus;
  transaction_id: string | null;
  created_at: string;
  updated_at: string;
}

export interface UpdatePaymentStatus {
  payment_status_update: PaymentStatus;
}

export interface createPaymentVariables {
    orderId:number;
    paymentData:CreatePaymentData;
}

export interface UpdatePaymentStatusVariables { 
    payment_id: number; 
    payload: UpdatePaymentStatus; 
}