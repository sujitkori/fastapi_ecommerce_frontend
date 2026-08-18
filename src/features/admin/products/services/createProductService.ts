import apiClient from "../../../../api/apiClient"
import type { Product } from "../../../product/types/product.types";
import type { ProductCreateFormData } from "../types/productForm.types";


export const createProduct = async (productData:ProductCreateFormData):Promise<Product> => {
    const response = await apiClient.post<Product>("/products/", productData);
    return response.data;
}