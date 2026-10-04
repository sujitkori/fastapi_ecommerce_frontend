import apiClient from "../../../../api/apiClient"
import type { DeleteProductResponse } from "../types/productForm.types";


export const deleteProduct = async (productId:number):Promise<DeleteProductResponse> => {
    const response = await apiClient.delete<DeleteProductResponse>(`/products/${productId}`);
    return response.data;
}