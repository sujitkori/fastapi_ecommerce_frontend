import apiClient from "../../../../api/apiClient"
import type { ProductListResponse } from "../../../product/types/product.types"
import type { AdminProductQueryParams } from "../types/adminProductQuery.types";


export const getAdminProducts = async (params:AdminProductQueryParams):Promise<ProductListResponse> => {
    const response = await apiClient.get<ProductListResponse>("/products/", {params});
    return response.data;
}