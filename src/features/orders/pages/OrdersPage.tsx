import { useNavigate } from "react-router-dom";
import useOrders from "../hooks/useOrders";
import { getApiErrorMessage } from "../../../utils/apiError";

const OrdersPage = () => {
  const { data, isPending, isError, error } = useOrders();
  const navigate = useNavigate();

  if (isPending) {
    return <div>Loading...</div>;
  }

  {
    isError && (
      <p className="text-sm text-red-600">
        {getApiErrorMessage(error, "Failed to load orders")}
      </p>
    );
  }

  const handleClick = (id: number) => {
    navigate(`/orders/${id}`);
  };

  if (!data || data.length === 0) {
    return (
      <div className="max-w-7xl mx-auto p-8 text-center">
        <h1 className="text-3xl font-bold mb-4">No Orders Yet</h1>

        <p className="text-gray-500">You haven't placed any orders yet.</p>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto p-8">
      <h1 className="text-3xl font-bold mb-8">My Orders</h1>

      <div className="space-y-6">
        {data.map((order) => (
          <div key={order.id} className="border rounded-lg p-6 shadow-sm">
            <div className="flex justify-between items-start">
              <div>
                <h2 className="text-lg font-semibold">Order #{order.id}</h2>

                <p className="text-gray-500 text-sm mt-1">
                  Placed on {new Date(order.created_at!).toLocaleDateString()}
                </p>
              </div>

              <span className="px-3 py-1 rounded-full bg-yellow-100 text-yellow-800 text-sm font-medium capitalize">
                {order.status}
              </span>
            </div>

            <div className="grid grid-cols-2 gap-6 mt-6">
              <div>
                <p className="text-gray-500 text-sm">Total Amount</p>

                <p className="font-semibold">
                  {new Intl.NumberFormat("en-IN", {
                    style: "currency",
                    currency: "INR",
                  }).format(order.total_amount)}
                </p>
              </div>

              <div>
                <p className="text-gray-500 text-sm">Total Items</p>

                <p className="font-semibold">
                  {order.order_items.reduce(
                    (total, item) => total + item.quantity,
                    0,
                  )}
                </p>
              </div>
            </div>

            <button
              className="mt-6 border border-black px-4 py-2 rounded-lg hover:bg-black hover:text-white transition cursor-pointer"
              onClick={() => handleClick(order.id)}
            >
              View Details
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default OrdersPage;
