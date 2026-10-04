import { useQuery } from "@tanstack/react-query"
import { getProducts } from "../services/productService";


const useProducts = (search:string, selectedCategory:number | null, sort:string, minPrice:number|undefined, maxPrice:number, skip:number, limit:number) => {
    return useQuery({
        queryKey:["products", search, selectedCategory, sort, minPrice, maxPrice, skip, limit],
        queryFn:() => getProducts(search, selectedCategory, sort, minPrice || 0, maxPrice, skip, limit)
    })
}

export default useProducts;