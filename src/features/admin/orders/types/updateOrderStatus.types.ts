import type { OrderStatus } from "../../../orders/types/order.types";

export interface UpdateOrderStatusRequest {
    status : OrderStatus
}

export type UpdateOrderStatusVariables = {
  orderId: number;
  payload: UpdateOrderStatusRequest;
};