import apiClient from "../../../api/apiClient";
import type { Product, ProductListResponse } from "../types/product.types";



export const getProducts = async (search: string, selectedCategory: number | null, sort: string, minPrice: number, maxPrice: number, skip: number, limit: number): Promise<ProductListResponse> => {
    const lastUnderscoreIndex = sort.lastIndexOf("_");
    const sortBy = sort === "" ? undefined : sort.slice(0, lastUnderscoreIndex);
    const sortOrder = sort === "" ? undefined : sort.slice(lastUnderscoreIndex + 1);


    const response = await apiClient.get<ProductListResponse>('/products/', {
        params: {
            ...(search && { search }),
            ...(selectedCategory !== null && {
                category_id: selectedCategory,
            }),
            ...(sortBy && {
                sort_by: sortBy,
            }),
            ...(sortOrder && {
                sort_order: sortOrder
            }),
            ...(minPrice !== undefined && {
                min_price: minPrice,
            }),
            max_price: maxPrice,

            skip,
            limit
        }
    });
    return response.data
}



export const getProduct = async (id: number): Promise<Product> => {
    const response = await apiClient.get<Product>(`/products/${id}`);
    return response.data;
}