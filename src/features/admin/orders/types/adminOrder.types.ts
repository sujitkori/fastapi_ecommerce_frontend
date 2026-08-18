import type { UserProfileResponse } from "../../../auth/types/user.types";
import type { OrderStatus } from "../../../orders/types/order.types";
import type { OrderItem } from "../../../orders/types/orderItem.types";
import type { Payment } from "../../../payment/types/payment.types";


export interface AdminOrderResponse {
    id:number;
    user: UserProfileResponse;
    total_amount: number;
    status: OrderStatus;
    created_at:string | null;
    updated_at:string | null;
    order_items: OrderItem[]
    payment: Payment | null;
}