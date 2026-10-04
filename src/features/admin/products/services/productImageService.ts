import apiClient from "../../../../api/apiClient";
import type { Product } from "../../../product/types/product.types";

export const uploadProductImage = async (productId:number, image: File):Promise<Product> => {
    const formData = new FormData();
    formData.append("image", image);
    // console.log(image);
    
    const response = await apiClient.post<Product>(`/products/${productId}/image`, formData);
    // console.log(response.data);
    return response.data;
}

export const updateProductImage = async (productId:number, image: File):Promise<Product> => {
    const formData = new FormData();
    formData.append("image", image);

    const response = await apiClient.put<Product>(`/products/${productId}/image`, formData);
    return response.data;
}