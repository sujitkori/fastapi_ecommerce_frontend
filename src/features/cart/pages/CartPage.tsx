import { getImageUrl } from "../../../utils/image";
import useCart from "../hooks/useCart";
import placeholderImage from "../../../assets/images/product-placeholder.png";
import { Trash2 } from "lucide-react";
import useUpdateCartItem from "../hooks/useUpdateCartItem";
import type { CartItemResponse } from "../types/cart.types";
import useDeleteCartItem from "../hooks/useDeleteCartItem";
import useCreateOrder from "../../orders/hooks/useCreateOrder";
import { toast } from "sonner";
import { getApiErrorMessage } from "../../../utils/apiError";
import { useNavigate } from "react-router-dom";

const CartPage = () => {
  const {
    data,
    isPending,
    isError: isCartItemError,
    error: cartItemError,
  } = useCart();

  const {
    mutate: updateCartItemMutation,
    isPending: isUpdateCartItemPending,
    isError: isUpdateCartItemError,
    error: updateCartItemError,
  } = useUpdateCartItem();
  const {
    mutate: deleteCartItemMutation,
    isPending: isDeletingCartItemPending,
    isError: isDeletingCartItemError,
    error: deleteCartItemError,
  } = useDeleteCartItem();

  const {
    mutate: createOrderMutation,
    isPending: isCreateOrderPending,
    isError: isCreateOrderError,
    error: createOrderError,
  } = useCreateOrder();

  const navigate = useNavigate();

  const totalProducts = data?.length ?? 0;

  const totalQuantity =
    data?.reduce((total, item) => {
      return total + item.quantity;
    }, 0) ?? 0;

  const subTotal =
    data?.reduce((total, item) => {
      if (!item.product) {
        return total;
      }
      return total + item.product.price * item.quantity;
    }, 0) ?? 0;

     const handleClick = () => {
    navigate("/products/");
  }

  if (
    isPending ||
    isUpdateCartItemPending ||
    isDeletingCartItemPending ||
    isCreateOrderPending
  ) {
    return <p>Loading...</p>;
  }


  if (isCartItemError) {
    return (
      <div>{getApiErrorMessage(cartItemError, "Failed to load cart.")}</div>
    );
  }

  if (isUpdateCartItemError) {
    return (
      <div>
        {getApiErrorMessage(updateCartItemError, "Failed to update cart item.")}
      </div>
    );
  }

  if (isDeletingCartItemError) {
    return (
      <div>
        {getApiErrorMessage(deleteCartItemError, "Failed to remove cart item.")}
      </div>
    );
  }

  if (isCreateOrderError) {
    return (
      <div>
        {getApiErrorMessage(createOrderError, "Failed to place order.")}
      </div>
    );
  }

  const handleIncreaseQuantity = (item: CartItemResponse) => {
    if (!item.product) {
      return;
    }

    const newQuantity = item.quantity + 1;

    if (newQuantity > item.product.stock_quantity) {
      return;
    }
    updateCartItemMutation(
      {
        cartItemId: item.id,
        payload: {
          quantity: newQuantity,
        },
      },
      {
        onSuccess: () => {
          toast.success("Cart updated successfully");
        },

        onError: (error) => {
          toast.error(getApiErrorMessage(error, "Failed to update cart item."));
        },
      },
    );
  };

  const handleDecreaseQuantity = (item: CartItemResponse) => {
    if (!item.product) {
      return;
    }

    const newQuantity = item.quantity - 1;

    if (item.quantity === 1) {
      deleteCartItemMutation(item.id, {
        onSuccess:() => {
          toast.success("Item removed from cart");
        },
        onError:(error) => {
          toast.error(
            getApiErrorMessage(error, "Failed to remove item from cart")
          )
        }
      });
      return;
    }

    updateCartItemMutation({
      cartItemId: item.id,
      payload: {
        quantity: newQuantity,
      },
    });
  };

  if (data?.length === 0) {
    return (
      <div className="max-w-7xl mx-auto p-8 text-center">
        <h1 className="text-3xl font-bold mb-4">Your cart is empty</h1>

        <p className="text-gray-500 mb-8">
          Looks like you haven't added anything yet.
        </p>

        <button className="bg-black text-white px-6 py-3 rounded-lg cursor-pointer" onClick={handleClick}>
          Continue Shopping
        </button>
      </div>
    );
  }

  const handlePlaceOrder = () => {
    createOrderMutation(undefined, {
      onSuccess: () => {
        toast.success("Order placed successfully");
      },
      onError: (error: any) => {
        toast.error(error?.response?.data?.detail ?? "Failed to place order");
      },
    });
  };


  return (
    <div className="max-w-7xl mx-auto p-8">
      <h1 className="text-3xl font-bold mb-8">Shopping Cart</h1>

      <div className="grid grid-cols-3 gap-8">
        <div className="col-span-2">
          {/* Cart Items */}

          {data?.map((item) => (
            <div key={item.id} className="border rounded-lg p-6 mb-4 shadow-sm">
              <div className="flex gap-6">
                <div className="w-32 h-32 shrink-0">
                  <img
                    src={
                      item.product?.image
                        ? getImageUrl(item.product.image)
                        : placeholderImage
                    }
                    alt={item.product?.name}
                    className="w-full h-full object-cover rounded-lg"
                  />
                </div>

                <div className="flex-1">
                  <h2 className="text-lg font-semibold">
                    {item.product?.name}
                  </h2>

                  <p className="text-sm text-gray-500 mt-1">
                    {item.product?.category?.name}
                  </p>

                  <p className="text-xl font-bold text-green-600 mt-3">
                    ₹
                    {new Intl.NumberFormat("en-IN").format(item.product?.price || 0)}
                  </p>

                  <div className="mt-6">
                    <p className="text-sm text-gray-600 mb-2">Quantity</p>

                    <div className="flex items-center border rounded-lg overflow-hidden w-fit">
                      <button
                        className="px-4 py-2 border-r hover:bg-gray-100 cursor-pointer"
                        onClick={() => handleDecreaseQuantity(item)}
                      >
                        -
                      </button>

                      <span className="px-6 py-2 font-semibold">
                        {item.quantity}
                      </span>

                      <button
                        className="px-4 py-2 border-l hover:bg-gray-100 cursor-pointer"
                        onClick={() => handleIncreaseQuantity(item)}
                      >
                        +
                      </button>
                    </div>

                    <div className="mt-6">
                      <button
                        className="text-red-600 flex items-center gap-4 hover:text-red-700 font-medium cursor-pointer"
                        onClick={() => deleteCartItemMutation(item.id)}
                      >
                        <Trash2 size={18} />
                        Remove
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div>
          {/* Order Summary */}

          <div className="border rounded-lg p-6 shadow-sm h-fit sticky top-8">
            <h2 className="text-xl font-semibold mb-6">Order Summary</h2>

            <div className="space-y-4">
              <div className="flex justify-between">
                <span>Products</span>
                <span>{totalProducts}</span>
              </div>

              <div className="flex justify-between">
                <span>Items</span>
                <span>{totalQuantity}</span>
              </div>

              <div className="flex justify-between">
                <span>Subtotal</span>
                <span>
                  {new Intl.NumberFormat("en-IN", {
                    style: "currency",
                    currency: "INR",
                  }).format(subTotal)}
                </span>
              </div>

              <div className="flex justify-between">
                <span>Shipping</span>
                <span className="text-green-600">Free</span>
              </div>

              <hr />

              <div className="flex justify-between text-lg font-semibold">
                <span>Total</span>
                <span>
                  {new Intl.NumberFormat("en-IN", {
                    style: "currency",
                    currency: "INR",
                  }).format(subTotal)}
                </span>
              </div>
            </div>

            <button
              className="w-full mt-6 bg-black text-white py-3 rounded-lg hover:bg-gray-800 transition"
              onClick={handlePlaceOrder}
              disabled={isCreateOrderPending}
            >
              {isCreateOrderPending ? "Placing Order..." : "Place Order"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartPage;
