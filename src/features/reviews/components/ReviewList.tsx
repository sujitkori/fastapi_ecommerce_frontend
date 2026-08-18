import type { UserProfileResponse } from "../../auth/types/user.types";
import type { ReviewResponse } from "../types/review.types";
import { Pencil } from "lucide-react";

interface ReviewListProps {
  user: UserProfileResponse | null;
  reviews: ReviewResponse[];
  onEditReview: (review:ReviewResponse) => void;
}

const ReviewList = ({user, reviews, onEditReview }: ReviewListProps) => {
  const handleEditClick = (review:ReviewResponse) => {
    onEditReview(review)
  }
  if (reviews.length === 0) {
    return <p className="text-gray-500">No reviews yet.</p>;
  }
  return (
    <div className="space-y-4">
      {reviews.map((review) => (
        <div key={review.id} className="rounded-lg border border-gray-200 p-5">
          <div className="flex items-center justify-between">
            <div>
              <p className="font-semibold text-gray-900">
                {review?.user?.name}
              </p>

              <p className="text-sm text-gray-500">
                {review.created_at
                  ? new Date(review.created_at).toLocaleDateString()
                  : "-"}
              </p>
            </div>

            <div className="font-semibold text-yellow-500 flex flex-col">
              {user.id ===  review.user_id? 
              <button
                type="button"
                className="text-sm font-medium text-blue-600 hover:text-blue-800 cursor-pointer ml-auto"
                onClick={() => handleEditClick(review)}
                title="Edit review"
                aria-label="Edit review"
              >
                
                <Pencil size={16} />
              </button>: ""}
              {"★".repeat(review.rating)}
              {"☆".repeat(5 - review.rating)}
            </div>
          </div>

          <p className="mt-3 text-gray-700">{review.comment}</p>
        </div>
      ))}
    </div>
  );
};

export default ReviewList;
