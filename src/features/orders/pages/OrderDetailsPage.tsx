import { useParams } from "react-router-dom";
import useSingleOrder from "../hooks/useSingleOrder";
import useCancelOrder from "../hooks/useCancelOrder";
import { toast } from "sonner";
import { getApiErrorMessage } from "../../../utils/apiError";
import { useState } from "react";
import type { PaymentMethod } from "../../payment/types/payment.types";
import useCreatePayment from "../../payment/hooks/useCreatePayment";

const OrderDetailsPage = () => {
  const { orderId } = useParams();
  const numericOrderId = Number(orderId);

  const {
    data,
    isPending,
    isError: isSingleOrderError,
    error: singleOrderError,
  } = useSingleOrder(numericOrderId);

  const { mutate: cancelOrderMutation, isPending: isCancelOrderPending } =
    useCancelOrder();

  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>("upi");

  const { mutate: createPaymentMutation, isPending: isCreatePaymentPending } =
    useCreatePayment();

  const handleCreatePayment = () => {
    createPaymentMutation(
      {
      orderId: data.id,
      paymentData: {
        payment_method: paymentMethod,
      },
    },
    {
      onSuccess:() => {
        toast.success("Payment initiated successfully")
      },
      onError:(error) => {
        toast.error(getApiErrorMessage(error, "Failed to create payment."))
      }
    }
  );
  };

  if (isSingleOrderError) {
    return (
      <div className="flex justify-center items-center py-20">
        <p className="text-lg text-red-600">
          {getApiErrorMessage(singleOrderError, "Failed to load order.")}
        </p>
      </div>
    );
  }

  const handleCancelOrder = () => {
    const confirmCancel = window.confirm(
      "Are you sure you want to cancel this order?",
    );

    if (!confirmCancel) {
      return;
    }

    cancelOrderMutation(data.id, {
      onSuccess: () => {
        toast.success("Order cancelled successfully");
      },

      onError: (error) => {
        toast.error(getApiErrorMessage(error, "Failed to cancel order."));
      },
    });
  };

  if (isPending || isCancelOrderPending) {
    return <div>Loading...</div>;
  }

  return (
    <div className="max-w-5xl mx-auto p-8">
      <h1 className="text-3xl font-bold mb-8">Order #{data.id}</h1>

      <div className="border rounded-lg p-6 mb-8">
        <div className="flex justify-between">
          <div>
            <p className="text-gray-500 text-sm">Placed On</p>

            <p>{new Date(data.created_at).toLocaleDateString()}</p>
          </div>

          <div>
            <p className="text-gray-500 text-sm">Status</p>

            <p className="capitalize">{data.status}</p>
          </div>

          <div>
            <p className="text-gray-500 text-sm">Total</p>

            <p className="font-semibold">
              {new Intl.NumberFormat("en-IN", {
                style: "currency",
                currency: "INR",
              }).format(data.total_amount)}
            </p>
          </div>
        </div>
      </div>

      <h2 className="text-2xl font-semibold mb-6">Ordered Items</h2>
      <div className="space-y-4">
        {data.order_items.map((item) => (
          <div
            key={item.id}
            className="border rounded-lg p-4 flex justify-between items-center"
          >
            <div>
              <h3 className="text-lg font-semibold">{item.product.name}</h3>

              <p className="text-gray-500">
                {new Intl.NumberFormat("en-IN", {
                  style: "currency",
                  currency: "INR",
                }).format(item.price_at_purchase)}
              </p>
            </div>

            <div className="text-right">
              <p>
                Qty: <span className="font-semibold">{item.quantity}</span>
              </p>

              <p className="font-semibold mt-2">
                {new Intl.NumberFormat("en-IN", {
                  style: "currency",
                  currency: "INR",
                }).format(item.price_at_purchase * item.quantity)}
              </p>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-8 grid grid-cols-2 gap-8">
        <div>
          {(data?.status === "pending" || data?.status === "paid") && (
            <button
              onClick={handleCancelOrder}
              className="mt-6 bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
            >
              Cancel Order
            </button>
          )}
        </div>

        <div>
          {data.status === "pending" && !data.payment && (
            <div className="mt-8 rounded-lg border p-6">
              <h2 className="mb-4 text-2xl font-semibold">Payment</h2>

              <div className="space-y-3">
                <label className="flex items-center gap-3">
                  <input
                    type="radio"
                    name="payment_method"
                    value="upi"
                    checked={paymentMethod === "upi"}
                    onChange={() => setPaymentMethod("upi")}
                  />
                  <span>UPI</span>
                </label>

                <label className="flex items-center gap-3">
                  <input
                    type="radio"
                    name="payment_method"
                    value="credit_card"
                    checked={paymentMethod === "credit_card"}
                    onChange={() => setPaymentMethod("credit_card")}
                  />
                  <span>Credit Card</span>
                </label>

                <label className="flex items-center gap-3">
                  <input
                    type="radio"
                    name="payment_method"
                    value="debit_card"
                    checked={paymentMethod === "debit_card"}
                    onChange={() => setPaymentMethod("debit_card")}
                  />
                  <span>Debit Card</span>
                </label>

                <label className="flex items-center gap-3">
                  <input
                    type="radio"
                    name="payment_method"
                    value="cash"
                    checked={paymentMethod === "cash"}
                    onChange={() => setPaymentMethod("cash")}
                  />
                  <span>Cash</span>
                </label>
              </div>

              <button
                type="button"
                onClick={handleCreatePayment}
                disabled={isCreatePaymentPending}
                className="mt-6 rounded-lg bg-black px-5 py-3 text-sm font-medium text-white hover:bg-gray-800 cursor-pointer disabled:cursor-not-allowed disabled:opacity-50"
              >
                {isCreatePaymentPending ? "Processing..." : "Create Payment"}
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default OrderDetailsPage;
