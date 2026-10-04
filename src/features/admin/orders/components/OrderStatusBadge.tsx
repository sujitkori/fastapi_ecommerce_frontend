import type { OrderStatus } from "../../../orders/types/order.types";

interface OrderStatusBadgeProps {
  status: OrderStatus;
}

const baseClasses =
  "inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold capitalize";

const statusStyles: Record<OrderStatus, string> = { // Here Record is Record<Keys, ValueType>. Typescript gives us Record. Meaning, "Create an object whose keys are Keys and whose values are ValueType."
  pending: "bg-yellow-100 text-yellow-800",
  paid: "bg-blue-100 text-blue-800",
  processing: "bg-indigo-100 text-indigo-800",
  shipped: "bg-purple-100 text-purple-800",
  delivered: "bg-green-100 text-green-800",
  cancelled: "bg-red-100 text-red-800",
};

const OrderStatusBadge = ({ status }: OrderStatusBadgeProps) => {
  return <span className={`${baseClasses} ${statusStyles[status]}`}>{status}</span>;
};

export default OrderStatusBadge;
