import type { OrderStatus } from "../../../orders/types/order.types";
import type { AdminOrderResponse } from "../types/adminOrder.types";
import useUpdateOrderStatus from "../hooks/useUpdateOrderStatus";

interface OrderStatusUpdateProps {
  order: AdminOrderResponse;
}

const getNextStatuses = (currentStatus: OrderStatus): OrderStatus[] => {
  switch (currentStatus) {
    case "pending":
      return [];
    case "paid":
      return ["processing"];
    case "processing":
      return ["shipped"];
    case "shipped":
      return ["delivered"];
    case "delivered":
      return [];
    case "cancelled":
      return [];

    default:
      return [];
  }
};

const OrderStatusUpdater = ({ order }: OrderStatusUpdateProps) => {
  const availableStatuses = getNextStatuses(order.status);

  const { mutate, isPending, isError } = useUpdateOrderStatus();

  if (availableStatuses.length === 0) {
    return <span className="text-sm text-gray-400">—</span>;
  }

  const handleStatusChange = (newStatus: OrderStatus) => {

    mutate({
      orderId: order.id,
      payload: {
        status: newStatus,
      },
    });
  };

  if (isError) {
    return <div>Something went wrong...</div>;
  }

  return (
    <div className="flex items-center gap-3">
      <select
        defaultValue=""
        disabled={isPending}
        onChange={(e) => handleStatusChange(e.target.value as OrderStatus)}
        className="rounded-md border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-black disabled:cursor-not-allowed disabled:opacity-50"
      >
      <option value="" disabled>select status</option>
        {availableStatuses.map((status) => {
          return (
            <option key={status} value={status}>
              {status.charAt(0) + status.slice(1)}
            </option>
          );
        })}
      </select>
    </div>
  );
};

export default OrderStatusUpdater;
