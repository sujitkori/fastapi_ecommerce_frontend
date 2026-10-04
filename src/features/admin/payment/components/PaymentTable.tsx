import type {
  Payment,
  PaymentStatus,
} from "../../../payment/types/payment.types";

interface PaymentTableProps {
  payments: Payment[];
  onUpdatePaymentStatus: (paymentId:number, status:PaymentStatus) => void;
}

const PaymentTable = ({
  payments,
  onUpdatePaymentStatus,
}: PaymentTableProps) => {

  const handlePaymentStatusChange = (
    paymentId: number,
    event: React.ChangeEvent<HTMLSelectElement>,
  ) => {
    const status = event.target.value as PaymentStatus;

    onUpdatePaymentStatus(paymentId, status);
  };

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-gray-600">
              Payment ID
            </th>

            <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-gray-600">
              Order ID
            </th>

            <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-gray-600">
              Amount
            </th>

            <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-gray-600">
              Method
            </th>

            <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-gray-600">
              Status
            </th>

            <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-gray-600">
              Transaction ID
            </th>

            <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-gray-600">
              Created At
            </th>

            <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-gray-600">
              Actions
            </th>
          </tr>
        </thead>

        <tbody className="divide-y divide-gray-100 bg-white">
          {payments.map((payment) => (
            <tr key={payment.id} className="transition-colors hover:bg-gray-50">
              <td className="px-6 py-4 text-sm font-medium text-gray-900">
                #{payment.id}
              </td>

              <td className="px-6 py-4 text-sm text-gray-700">
                #{payment.order_id}
              </td>

              <td className="px-6 py-4 text-sm font-medium text-gray-900">
                ₹{new Intl.NumberFormat("en-IN").format(payment.amount)}
              </td>

              <td className="px-6 py-4 text-sm capitalize text-gray-700">
                {payment.payment_method.replace("_", " ")}
              </td>

              <td className="px-6 py-4">
                <span
                  className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ${
                    payment.payment_status === "success"
                      ? "bg-green-100 text-green-700"
                      : payment.payment_status === "failed"
                        ? "bg-red-100 text-red-700"
                        : payment.payment_status === "refunded"
                          ? "bg-purple-100 text-purple-700"
                          : "bg-yellow-100 text-yellow-700"
                  }`}
                >
                  {payment.payment_status}
                </span>
              </td>

              <td className="max-w-xs truncate px-6 py-4 text-sm text-gray-600">
                {payment.transaction_id}
              </td>

              <td className="px-6 py-4 text-sm text-gray-600">
                {new Date(payment.created_at).toLocaleDateString()}
              </td>

              <td className="px-6 py-4">
                {payment.payment_status === "pending" && (
                  <select
                    defaultValue=""
                    onChange={(event) =>
                      handlePaymentStatusChange(payment.id, event)
                    }
                    className="rounded-md border border-gray-300 px-3 py-2 text-sm"
                  >
                    <option value="" disabled>
                      Update Status
                    </option>

                    <option value="success">Success</option>
                    <option value="failed">Failed</option>
                  </select>
                )}

                {payment.payment_status === "success" && (
                  <span className="text-sm text-gray-500">Processed</span>
                )}

                {payment.payment_status === "failed" && (
                  <span className="text-sm text-gray-500">Processed</span>
                )}

                {payment.payment_status === "refunded" && (
                  <span className="text-sm text-gray-500">Refunded</span>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default PaymentTable;
