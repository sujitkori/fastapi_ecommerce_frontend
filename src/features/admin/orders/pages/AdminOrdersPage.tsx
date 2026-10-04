import { getApiErrorMessage } from "../../../../utils/apiError";
import OrderStatusBadge from "../components/OrderStatusBadge";
import OrderStatusUpdater from "../components/OrderStatusUpdater";
import useAdminOrders from "../hooks/useAdminOrders";

const AdminOrdersPage = () => {
  const { data, isPending, isError, error } = useAdminOrders();

  if (isPending) {
    return (
      <div className="flex justify-center items-center py-20">
        <p className="text-gray-500 text-lg">Loading orders...</p>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="flex justify-center items-center py-20">
        <p className="text-red-600 text-lg">
          {getApiErrorMessage(error, "Failed to load orders.")}
        </p>
      </div>
    );
  }

  if (!data) {
    return (
      <div className="py-20 text-center">
        <h2 className="text-xl font-semibold text-gray-700">No Orders Found</h2>

        <p className="mt-2 text-gray-500">
          There are currently no customer orders.
        </p>
      </div>
    );
  }

  return (
    <div className="p-8">
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        {/* Header */}
        <div className="px-6 py-5 border-b border-gray-200">
          <h1 className="text-2xl font-bold text-gray-900">Orders</h1>

          <p className="text-sm text-gray-500 mt-1">Manage customer orders</p>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            {/* Table Head */}
            <thead className="bg-gray-50">
              <tr>  
                <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-gray-600">
                  Customer
                </th>

                <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-gray-600">
                  Email
                </th>

                <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-gray-600">
                  Total
                </th>

                <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-gray-600">
                  Status
                </th>

                <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-gray-600">
                  Created At
                </th>

                <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-gray-600">
                  Change Status
                </th>
              </tr>
            </thead>

            {/* Table Body */}
            <tbody className="divide-y divide-gray-100 bg-white">
              {data.map((order) => (
                <tr
                  key={order.id}
                  className="hover:bg-gray-50 transition-colors"
                >
                  <td className="px-6 py-4">
                    <div className="font-medium text-gray-900">
                      {order.user.name}
                    </div>
                  </td>

                  <td className="px-6 py-4 text-sm text-gray-600">
                    {order.user.email}
                  </td>

                  <td className="px-6 py-4 font-medium text-gray-900">
                    ₹{order.total_amount}
                  </td>

                  <td className="px-6 py-4">
                    <OrderStatusBadge status={order.status}/>
                    
                  </td>

                  <td className="px-6 py-4 text-sm text-gray-600">
                    {new Date(order.created_at!).toLocaleDateString()}
                  </td>

                  <td className="px-6 py-4 text-sm text-gray-600">
                    <OrderStatusUpdater order={order}/>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AdminOrdersPage;
