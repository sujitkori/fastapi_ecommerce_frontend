import apiClient from "../../../../api/apiClient";
import type { Product } from "../../../product/types/product.types";
import type { ProductUpdateFormData } from "../types/productForm.types";


export const updateProduct = async (productId:number, productData:ProductUpdateFormData):Promise<Product> => {
    const response = await apiClient.put<Product>(`/products/${productId}`, productData);
    return response.data;
}