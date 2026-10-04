import { toast } from "sonner";
import { getApiErrorMessage } from "../../../../utils/apiError";
import type { PaymentStatus } from "../../../payment/types/payment.types";
import PaymentTable from "../components/PaymentTable";
import useAdminPayments from "../hooks/useAdminPayments";
import useUpdatePaymentStatus from "../hooks/useUpdatePaymentStatus";

const AdminPaymentsPage = () => {
  const { data, isPending, isError, error } = useAdminPayments();

  const {mutate:updatePaymentStatusMutation, isPending:isUpdatePaymentStatusPending} = useUpdatePaymentStatus();

  const onUpdatePaymentStatus = (paymentId:number, status:PaymentStatus) => {
    updatePaymentStatusMutation({
        payment_id:paymentId,
        payload: {
            payment_status_update:status
        }
    },{
        onSuccess:() => {
            toast.success("Payment status updated successfully")
        },
        onError: (error) => {
            toast.error(getApiErrorMessage(error, "Failed to update payment status"))
        }
    })
  }

  if (isPending || isUpdatePaymentStatusPending) {
    return <div>Loading payments...</div>;
  }

  if (isError) {
    return (
      <div className="flex justify-center items-center py-20">
        <p className="text-red-600 text-lg">
          {getApiErrorMessage(error, "Failed to load payments.")}
        </p>
      </div>
    );
  }

  if (!data || data.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-20">
        <h2 className="text-xl font-semibold">No Payments Found</h2>

        <p className="mt-2 text-gray-500">
          There are currently no payment records.
        </p>
      </div>
    );
  }

  return (
    <div>
      <div className="border-b border-gray-200 px-6 py-4">
        <h1 className="text-xl font-semibold text-gray-900">Payments</h1>

        <p className="text-sm text-gray-500">Manage customer payments</p>
      </div>
      <PaymentTable 
      payments={data} 
      onUpdatePaymentStatus={onUpdatePaymentStatus}
      />
    </div>
  );
};

export default AdminPaymentsPage;
