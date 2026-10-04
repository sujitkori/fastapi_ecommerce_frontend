import { useMutation, useQueryClient } from '@tanstack/react-query'
import { updateProductImage, uploadProductImage } from '../services/productImageService'

interface UploadProductImageVariables {
  productId: number;
  image: File;
}

const useProductImage = () => {
    const queryClient = useQueryClient();

    const  uploadMutation = useMutation({
        mutationKey:["uploadProductImage"],
        mutationFn:({productId, image}:UploadProductImageVariables) => uploadProductImage(productId, image),
        onSuccess: (_, variables) => {
            queryClient.invalidateQueries({
                queryKey:["product", variables.productId]
            });

            queryClient.invalidateQueries({
                queryKey:["products"]
            })
        }
    })

    const  updateMutation = useMutation({
        mutationKey:["updateProductImage"],
        mutationFn:({productId, image}:UploadProductImageVariables) => updateProductImage(productId, image),
        onSuccess: (_, variables) => {
            queryClient.invalidateQueries({
                queryKey:["product", variables.productId]
            });

            queryClient.invalidateQueries({
                queryKey:["products"]
            })

            queryClient.invalidateQueries({
                queryKey:["adminProducts"]
            })
        }
    })
  return {
    uploadProductImage: uploadMutation.mutateAsync,
    isUploadingProductImage: uploadMutation.isPending,

    updateProductImage: updateMutation.mutateAsync,
    isUpdatingProductImage: updateMutation.isPending,
  }
}

export default useProductImage



// When we write:

// return {
//   uploadProductImage: uploadMutation.mutate,
// };

// this is an object literal.

// The syntax is:

// property name : value

// So:
// uploadProductImage: uploadMutation.mutate
// means:

// property name       value
//      ↓                ↓
// uploadProductImage : uploadMutation.mutate

// We are saying:

// Return an object that has a property called uploadProductImage, whose value is uploadMutation.mutate.

// It is not aliasing here.
// ------------------------------------------------------------------------------------

// Destructuring and object returning are different.
// Compare them side by side
// Destructuring
// const { mutate: uploadMutation } = useProductImage();

// Think:

// mutate → rename to → uploadMutation

// Object return
// return {
//   uploadProductImage: uploadMutation.mutate,
// };

// Think:

// property name → value
// uploadProductImage → uploadMutation.mutate

// --------------------------------------------------------------------------------------------------

// Why does this become confusing?

// Because both use :.

// But they mean different things.

// Destructuring
// const { originalName: newName } = object;

// means:

// Rename originalName to newName.

// Object literal
// const object = {
//   propertyName: value,
// };

// means:

// Create a property called propertyName with this value