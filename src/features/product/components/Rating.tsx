import { FaStar, FaStarHalfAlt, FaRegStar } from "react-icons/fa"

interface RatingProps {
    averageRating:number | null, 
    reviewCount: number
}

const Rating = ({averageRating, reviewCount}:RatingProps) => {
  return (
    <div className="flex items-center gap-2">
    {/* <Star
        className="text-yellow-500 fill-yellow-500"
        size={18}
    /> */}
    {
        Array.from({length:5}).map((_, index) => {
            const starNumber = index + 1;
            const fullStars = Math.floor(averageRating ?? 0);
            const hasHalfStar = (averageRating ?? 0)  - fullStars >= 0.5

            if (starNumber <= fullStars){
                return <FaStar key={starNumber} className="text-yellow-500"/>
            } else if(starNumber === fullStars + 1 &&  hasHalfStar) {
                return <FaStarHalfAlt key={starNumber} className="text-yellow-500"/>
            } else {
                return <FaRegStar key={starNumber} className="text-yellow-500"/>
            }
            
        })
    }

    <span className="font-medium">
        {averageRating?.toFixed(1) ?? "0.0"}
    </span>

    <span className="text-gray-500">
        ({reviewCount} reviews)
    </span>
</div>
  )
}

export default Rating
