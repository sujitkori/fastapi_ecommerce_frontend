import type { Payment } from "../../payment/types/payment.types";
import type { OrderItem } from "./orderItem.types";

export type OrderStatus =
  | "pending"
  | "paid"
  | "processing"
  | "shipped"
  | "delivered"
  | "cancelled";

export interface OrderResponse {
    id:number;
    user_id: number;
    total_amount: number;
    status: OrderStatus;
    created_at:string | null;
    updated_at:string | null;
    order_items: OrderItem[]
    payment: Payment | null;
}