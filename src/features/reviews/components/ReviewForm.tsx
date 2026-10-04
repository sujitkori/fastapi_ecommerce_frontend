import { useEffect, useState } from "react";
import type { ReviewRequest, ReviewResponse } from "../types/review.types";

interface ReviewFormProps {
  mode:"create" | "edit";
  review?:ReviewResponse;
  onSubmit: (reviewData: ReviewRequest) => void;
  isLoading: boolean;
}

const ReviewForm = ({mode, review, onSubmit, isLoading}:ReviewFormProps) => {
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState("");

  useEffect(() => {
    if(mode === "create") {
      setRating(5);
      setComment("");
    } 

    if(mode === "edit" && review){
      setRating(review.rating);
      setComment(review.comment);
    }
  }, [mode, review])

  const handleSubmit = (event:React.SubmitEvent<HTMLFormElement>) => {
    event.preventDefault();
    onSubmit({rating, comment});
  }

  

  return (
    <div className="mt-10 rounded-lg border p-6">
      <h2 className="mb-4 text-2xl font-semibold">
        {
        mode === "create" ? "Write a Review": "Edit a Review"
        }
      </h2>

      <form onSubmit={handleSubmit} className="space-y-4">
         <div>
          <label className="mb-2 block font-medium">
            Rating
          </label>

          <select
            value={rating}
            onChange={(event) =>
              setRating(Number(event.target.value))
            }
            className="rounded-md border px-3 py-2"
          >
            <option value={5}>5 Stars</option>
            <option value={4}>4 Stars</option>
            <option value={3}>3 Stars</option>
            <option value={2}>2 Stars</option>
            <option value={1}>1 Star</option>
          </select>
        </div>

        {/* Comment */}
        <div>
          <label className="mb-2 block font-medium">
            Comment
          </label>

          <textarea
            value={comment}
            onChange={(event) =>
              setComment(event.target.value)
            }
            rows={4}
            className="w-full rounded-md border px-3 py-2"
            placeholder="Share your experience..."
          />
        </div>

        <button
          type="submit"
          disabled={isLoading}
          className="rounded-lg bg-black px-5 py-3 text-white disabled:opacity-50 cursor-pointer"
        >
          {isLoading
            ? "saving..."
            :  mode === "create"
            ? "Submit Review"
            : "Update Review"
            }
        </button>
      </form>
    </div>
  );
};

export default ReviewForm;
