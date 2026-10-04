import apiClient from "../../../../api/apiClient";
import type { Category, CategoryRequestData } from "../../../category/types/category.types";


export const createCategory = async (categoryData:CategoryRequestData):Promise<Category> => {
    const response = await apiClient.post<Category>("/categories/", categoryData);
    return response.data;
}