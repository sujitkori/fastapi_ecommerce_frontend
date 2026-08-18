import { useParams } from "react-router-dom";
import useProduct from "../hooks/useProduct";
import { getImageUrl } from "../../../utils/image";
import placeholderImage from "../../../assets/images/product-placeholder.png";
import Rating from "../components/Rating";
import { useState } from "react";
import type { AddToCartRequest } from "../../cart/types/cart.types";
import useAddToCart from "../../cart/hooks/useAddToCart";
import { toast } from "sonner";
import { getApiErrorMessage } from "../../../utils/apiError";
import useReviews from "../../reviews/hooks/useReview";
import ReviewList from "../../reviews/components/ReviewList";
import ReviewForm from "../../reviews/components/ReviewForm";
import useCreateReview from "../../reviews/hooks/useCreateReview";
import type {
  ReviewRequest,
  ReviewResponse,
} from "../../reviews/types/review.types";
import { useAuth } from "../../auth/hooks/useAuth";
import useUpdateReview from "../../reviews/hooks/useUpdateReview";

const ProductDetailPage = () => {
  const { id } = useParams();
  const productId = Number(id);
  const isValidProductId = !isNaN(productId);

  const [mode, setMode] = useState<"create" | "edit">("create");
  const [quantity, setQuantity] = useState(1);
  const { user } = useAuth();
  const [selectedReview, setSelectedReview] = useState<ReviewResponse | null>(
    null,
  );

  const { data, isPending, isError, error } = useProduct(
    productId,
    isValidProductId,
  );

  const { mutate, isPending: isAddingToCartLoading } = useAddToCart();

  const {
    data: reviews,
    isPending: isReviewsPending,
    isError: isReviewsError,
    error: reviewsError,
  } = useReviews(productId);

  const { mutate: createReviewMutation, isPending: isCreateReviewPending } =
    useCreateReview();
  const { mutate: updateReviewMutation, isPending: isUpdateReviewPending } =
    useUpdateReview();

  const stockStatus =
    data?.stock_quantity === 0
      ? "Out of Stock"
      : data?.stock_quantity <= 5
        ? "Only a few left"
        : "In Stock";

  const myReview = reviews?.find((review) => {
    return review.user_id === user.id && review.product_id === productId;
  });

  // const shouldShowReviewForm =
  // (mode === "create" && !myReview) ||
  // (mode === "edit" && selectedReview !== null);

  const shouldShowCreateForm = mode === "create" && myReview === undefined;

  const shouldShowEditForm = mode === "edit" && selectedReview !== null;

  const shouldShowReviewForm = shouldShowCreateForm || shouldShowEditForm;

  const handleMinusClick = () => {
    setQuantity((prev) => {
      return prev > 0 ? prev - 1 : 1;
    });
  };

  const handlePlusClick = () => {
    setQuantity((prev) => {
      return prev < data.stock_quantity ? prev + 1 : data.stock_quantity;
    });
  };

  const handleEditReview = (review: ReviewResponse) => {
    setSelectedReview(review);
    setMode("edit");
  };

  const handleAddToCart = () => {
    const payload: AddToCartRequest = {
      product_id: data.id,
      quantity,
    };

    mutate(payload, {
      onSuccess: () => {
        toast.success("Product added to cart successfully");
      },
      onError: (error) => {
        toast.success(
          getApiErrorMessage(error, "Failed to add product to cart"),
        );
      },
    });
  };

  const handleCreateReview = (reviewData: ReviewRequest) => {
    createReviewMutation(
      { productId: data.id, reviewData: reviewData },
      {
        onSuccess: () => {
          toast.success("Review submitted successfully");
        },
        onError: (error) => {
          toast.error(getApiErrorMessage(error, "Failed to submit review"));
        },
      },
    );
  };

  const handleUpdateReview = (reviewData: ReviewRequest) => {
    if (!selectedReview) {
      return;
    }
    updateReviewMutation(
      { productId: data.id, reviewData: reviewData },
      {
        onSuccess: () => {
          toast.success("Review updated successfully");
        },
        onError: (error) => {
          toast.error(getApiErrorMessage(error, "Failed to update review."));
        },
      },
    );
  };

  if (isPending || isAddingToCartLoading || isReviewsPending) {
    return <p>Loading...</p>;
  }

  if (isError) {
    return (
      <div className="flex justify-center items-center py-20">
        <p className="text-lg text-red-600">
          {getApiErrorMessage(error, "Failed to load product")}
        </p>
      </div>
    );
  }

  if (isReviewsError) {
    return (
      <div className="flex justify-center items-center py-20">
        <p className="text-lg text-red-600">
          {getApiErrorMessage(reviewsError, "Failed to load reviews")}
        </p>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto p-8">
      <div className="grid grid-cols-2 gap-10">
        <div className="flex justify-center">
          <img
            src={data?.image ? getImageUrl(data.image) : placeholderImage}
            alt={data?.name}
            className="w-full max-w-md rounded-lg shadow-lg object-cover"
          />
        </div>

        <div className="flex flex-col gap-4">
          <h1 className="text-4xl font-bold">{data?.name}</h1>

          <Rating
            averageRating={data?.average_rating}
            reviewCount={data?.review_count}
          />

          <p className="text-3xl font-semibold text-green-600">
            ₹{data?.price}
          </p>

          <div className="bg-gray-100 rounded-lg p-4 flex flex-col gap-3">
            <div className="flex justify-between">
              <span className="font-medium text-gray-600">Category</span>

              <span className="font-semibold">{data?.category?.name}</span>
            </div>

            <div className="flex justify-between items-center">
              <span className="font-medium text-gray-600">Stock</span>

              <span className="font-semibold">
                {stockStatus}
                {data.stock_quantity > 0 &&
                  ` (${data?.stock_quantity} available)`}
              </span>
            </div>
          </div>

          <div>
            <h2 className="text-xl font-semibold mb-2">Description</h2>

            <p className="text-gray-700 leading-relaxed">{data?.description}</p>
          </div>

          <div className="flex flex-col gap-4 mt-4">
            <div>
              <h3 className="font-semibold text-lg mb-2">Quantity</h3>

              <div className="flex items-center w-fit border rounded-lg overflow-hidden">
                <button
                  onClick={handleMinusClick}
                  disabled={quantity === 1}
                  className="px-4 py-2 border-r hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
                >
                  -
                </button>

                <span className="px-6 py-2 font-semibold">{quantity}</span>

                <button
                  onClick={handlePlusClick}
                  disabled={quantity === data.stock_quantity}
                  className="px-4 py-2 border-l hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
                >
                  +
                </button>
              </div>
            </div>

            <button
              className={`bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white font-semibold py-3 rounded-lg transition cursor-pointer disabled:cursor-not-allowed`}
              onClick={handleAddToCart}
              disabled={isAddingToCartLoading}
            >
              {isAddingToCartLoading ? "Adding..." : "Add to Cart"}
            </button>
          </div>
          <div className="mt-12">
            <h2 className="mb-6 text-2xl font-semibold">Customer Reviews</h2>

            <ReviewList
              user={user}
              reviews={reviews ?? []}
              onEditReview={handleEditReview}
            />

            {shouldShowReviewForm && (
              <ReviewForm
                mode={mode}
                review={mode === "edit" ? selectedReview : undefined}
                onSubmit={
                  mode === "edit" ? handleUpdateReview : handleCreateReview
                }
                isLoading={
                  mode === "edit"
                    ? isUpdateReviewPending
                    : isCreateReviewPending
                }
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailPage;
