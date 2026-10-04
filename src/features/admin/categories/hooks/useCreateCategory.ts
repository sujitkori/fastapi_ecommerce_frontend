import { useMutation, useQueryClient } from "@tanstack/react-query"
import { createCategory } from "../services/createCategoryService"
import type { CategoryRequestData } from "../../../category/types/category.types";

const useCreateCategory = () => {
    const queryClient = useQueryClient();

  return useMutation({
    mutationKey:["createCategory"],
    mutationFn:(categoryData:CategoryRequestData) => createCategory(categoryData),
    onSuccess:() => {
        queryClient.invalidateQueries({
            queryKey:["categories"],
        })
    }
  })
}

export default useCreateCategory
