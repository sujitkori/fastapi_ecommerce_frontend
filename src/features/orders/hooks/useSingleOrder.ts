import { useQuery } from "@tanstack/react-query";
import { getSingleOrder } from "../services/getSingleOrderService";

const useSingleOrder = (orderId: number) => {
  return useQuery({
    queryKey: ["order", orderId],
    queryFn: () => getSingleOrder(orderId),
    enabled: !!orderId,
  });
};

export default useSingleOrder;

// enabled is React Query Option
// "We use enabled to prevent React Query from executing the API call
//  until all required data (like orderId) is available."

// It Simply means,
// Should this query run automatically?

// If enabled: true, React Query immediately calls getSingleOrder(orderId)
// If enabled: false, React Query does nothing. It waits till it get's Truthy value for orderId.


// NOTE: enabled: !!orderId means, execute or run getSingleOrder(orderId) only if there is OrderId, which will become true.
// and if orderId is undefined or any Falsy value(0, "", NULL, NaN, false) then enabled will be false so it will not execute or run getSingleOrder(orderId).

// We can also write enabled:!!orderId as shown below,
// enabled: orderId ? true : false

// Or it can also be written as

// enabled: Boolean(orderId). SO if there is OrderDetailsPage, for example if orderId is 15 then Boolean(15) will be true,
// SO it will execute getSingleOrder(orderId). And if Boolean(undefined or any Falsy value), then it will be Boolean(undefined) will be false.

// But experienced developers write enabled: !!orderId because it's syntax is very short. That's it.