import { keepPreviousData, useQuery } from '@tanstack/react-query'
import { getAdminProducts } from '../services/adminProductService'
import type { AdminProductQueryParams } from '../types/adminProductQuery.types'

const useAdminProducts = (params:AdminProductQueryParams) => {
  return useQuery({
    queryKey:["adminProducts", params],
    queryFn:() =>getAdminProducts(params),
    placeholderData:keepPreviousData // We are keeping it because after every key stroke, the page is re-rendering because of which queryKey changes and new API request isPending=true return Loading ProductTable component unmounted Input destroyed focus lost. 
  })
}

export default useAdminProducts
