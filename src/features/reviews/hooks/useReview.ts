import { useQuery } from '@tanstack/react-query'
import { getReviews } from '../services/getReviewsService'

const useReviews = (productId:number) => {
  return useQuery({
    queryKey:["reviews",productId],
    queryFn:() => getReviews(productId),
    enabled: !!productId,
  })
}

export default useReviews;
