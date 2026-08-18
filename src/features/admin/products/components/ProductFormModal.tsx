import React, { useEffect, useState } from "react";
import type { ProductCreateFormData } from "../types/productForm.types";
import CategoryDropdown from "../../../category/components/CategoryDropdown";
import useCreateProduct from "../hooks/useCreateProduct";
import type { Product } from "../../../product/types/product.types";
import useUpdateProduct from "../hooks/useUpdateProduct";
import { toast } from "sonner";
import { getApiErrorMessage } from "../../../../utils/apiError";
import useProductImage from "../hooks/useProductImage";
import { getImageUrl } from "../../../../utils/image";

interface ProductFormModalProps {
  isOpen: boolean;
  mode: "create" | "edit";
  onClose: () => void;
  product?: Product | null;
}

const ProductFormModal = ({
  isOpen,
  mode,
  onClose,
  product,
}: ProductFormModalProps) => {
  const [formData, setFormData] = useState<ProductCreateFormData>({
    name: "",
    description: "",
    price: 0,
    stock_quantity: 0,
    category_id: undefined,
    is_active: true,
  });

  const [errors, setErrors] = useState({
    name: "",
    description: "",
    price: "",
    stock_quantity: "",
    category_id: "",
  });

  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  const { mutate: createProduct, isPending: isCreateProductPending } =
    useCreateProduct();
  const { mutate: updateProduct, isPending: isUpdateProductPending } =
    useUpdateProduct();

  const {
    uploadProductImage,
    isUploadingProductImage,
    updateProductImage,
    isUpdatingProductImage,
  } = useProductImage();

  useEffect(() => {
    if (!isOpen) {
      return;
    }
    console.log(mode);
    if (mode === "create") {
      setFormData({
        name: "",
        description: "",
        price: 0,
        stock_quantity: 0,
        category_id: undefined,
        is_active: true,
      });
      setSelectedImage(null);
      setImagePreview(null);
      setErrors({
        name: "",
        description: "",
        price: "",
        stock_quantity: "",
        category_id: "",
      });
      return;
    }

    if (mode === "edit" && product) {
      setFormData({
        name: product.name,
        description: product.description,
        price: product.price,
        stock_quantity: product.stock_quantity,
        category_id: product.category_id,
        is_active: product.is_active,
      });
      setSelectedImage(null);
      console.log(product?.image);
      setErrors({
        name: "",
        description: "",
        price: "",
        stock_quantity: "",
        category_id: "",
      });
      setImagePreview(product?.image ? getImageUrl(product.image) : null);
    }
  }, [isOpen, mode, product]);

  useEffect(() => {
    if (!selectedImage) {
      // setImagePreview(null);
      return;
    }

    const previewUrl = URL.createObjectURL(selectedImage);

    setImagePreview(previewUrl);

    return () => {
      URL.revokeObjectURL(previewUrl);
    };
  }, [selectedImage]); // We have used useEffect because, we need to release the Browser memory. The flow is, when uer selects a file selectedImage thennuseEffect runs, then URL.createObjectURL(file), then imagePreview then  <>img src={imagePreview}/>. When the selected file changes or the component unmounts: old preview URL, then URL.revokeObjectURL(), then browser memory is released. This cleanup is important because createObjectURL() creates a browser-managed object URL.

  if (!isOpen) {
    return;
  }

  const validateForm = () => {
    const newErrors = {
      name: "",
      description: "",
      price: "",
      stock_quantity: "",
      category_id: "",
    };

    if (formData.name.trim().length === 0) {
      newErrors.name = "Product name is required";
    } else if (formData.name.trim().length > 150) {
      newErrors.name = "Product name cannot exceed 150 characters";
    }

    if (formData.description.length > 2000) {
      newErrors.description = "Description cannot exceed 2000 characters";
    }

    if (formData.price <= 0) {
      newErrors.price = "Price must be greater than 0";
    }

    if (formData.stock_quantity < 0) {
      newErrors.stock_quantity = "Stock quantity cannot be negative";
    }

    if (formData.category_id === undefined) {
      newErrors.category_id = "Please select a category";
    }

    setErrors(newErrors);

    return !Object.values(newErrors).some((error) => error !== "");
  };

  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = event.target;

    setFormData((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });

    setErrors((prev) => ({
      ...prev,
      [name]: "",
    }));
  };

  const handleCategoryChange = (categoryId: number | undefined) => {
    setFormData((prev) => {
      return {
        ...prev,
        category_id: categoryId ?? undefined,
      };
    });

    setErrors((prev) => ({
      ...prev,
      category_id: "",
    }));
  };

  const handleSubmit = (event: React.SubmitEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!validateForm()) {
      return;
    }

    if (mode === "create") {
      createProduct(formData, {
        onSuccess: async (createdProduct) => {
          try {
            if (selectedImage) {
              await uploadProductImage({
                productId: createdProduct.id,
                image: selectedImage,
              });
            }
            setFormData({
              name: "",
              description: "",
              price: 0,
              stock_quantity: 0,
              category_id: undefined,
              is_active: true,
            });

            setSelectedImage(null);
            toast.success("Product Added Successfully");
            onClose();
          } catch (error) {
            toast.error(
              getApiErrorMessage(error, "Failed to upload product image"),
            );
          }
        },
        onError: (error) => {
          toast.error(getApiErrorMessage(error, "Failed to create product"));
        },
      });
      return;
    }

    if (mode === "edit" && product) {
      updateProduct(
        {
          productId: product.id,
          productData: formData,
        },
        {
          onSuccess: async () => {
            try {
              if (selectedImage) {
                await updateProductImage({
                  productId: product.id,
                  image: selectedImage,
                });
              }

              setSelectedImage(null);
              toast.success("Product Updated Successfully");
              onClose();
            } catch (error) {
              toast.error(
                getApiErrorMessage(error, "Failed to update product image"),
              );
            }
          },
          onError: (error) => {
            toast.error(getApiErrorMessage(error, "Failed to update product"));
          },
        },
      );
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
      <div className="flex w-full max-w-2xl max-h-[90vh] flex-col rounded-xl bg-white shadow-xl">
        {/* Header */}
        <div className="flex shrink-0 items-center justify-between border-b px-6 py-4">
          <h2 className="text-lg font-semibold text-gray-900">
            {mode === "create" ? "Add Product" : "Edit Product"}
          </h2>

          <button
            type="button"
            onClick={onClose}
            className="text-2xl text-gray-500 hover:text-gray-900 cursor-pointer"
          >
            x
          </button>
        </div>

        {/* Form will come here */}
        <div className="min-h-0 flex-1 overflow-y-auto">
          <form className="p-8" onSubmit={handleSubmit}>
            <div className="space-y-5">
              <div>
                <label
                  htmlFor="name"
                  className="mb-1.5 block text-sm font-medium text-gray-700"
                >
                  Product Name
                </label>

                <input
                  id="name"
                  name="name"
                  type="text"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Enter product name"
                  className="w-full rounded-lg border border-gray-300 px-4 py-2.5 text-sm outline-none focus:border-black focus:ring-2 focus:ring-black/10"
                />
                {errors.name && (
                  <p className="mt-1 text-sm text-red-600">{errors.name}</p>
                )}
              </div>

              <div>
                <label
                  htmlFor="description"
                  className="mb-1.5 block text-sm font-medium text-gray-700"
                >
                  Description
                </label>

                <textarea
                  id="description"
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  placeholder="Enter product description"
                  rows={4}
                  className="w-full resize-none rounded-lg border border-gray-300 px-4 py-2.5 text-sm outline-none focus:border-black focus:ring-2 focus:ring-black/10"
                />
                {errors.description && (
                  <p className="mt-1 text-sm text-red-600">
                    {errors.description}
                  </p>
                )}
              </div>

              <div className="grid grid-cols-2 gap-5">
                {/* Price */}
                <div>
                  <label
                    htmlFor="price"
                    className="mb-1.5 block text-sm font-medium text-gray-700"
                  >
                    Price
                  </label>

                  <input
                    id="price"
                    name="price"
                    type="number"
                    min={0}
                    value={formData.price}
                    onChange={(e) =>
                      setFormData((prev) => ({
                        ...prev,
                        price: Number(e.target.value),
                      }))
                    }
                    placeholder="Enter price"
                    className="w-full rounded-lg border border-gray-300 px-4 py-2.5 text-sm outline-none focus:border-black focus:ring-2 focus:ring-black/10"
                  />
                  {errors.price && (
                    <p className="mt-1 text-sm text-red-600">{errors.price}</p>
                  )}
                </div>

                {/* Stock Quantity */}
                <div>
                  <label
                    htmlFor="stock_quantity"
                    className="mb-1.5 block text-sm font-medium text-gray-700"
                  >
                    Stock Quantity
                  </label>

                  <input
                    id="stock_quantity"
                    name="stock_quantity"
                    type="number"
                    min={0}
                    value={formData.stock_quantity}
                    onChange={(e) =>
                      setFormData((prev) => ({
                        ...prev,
                        stock_quantity: Number(e.target.value),
                      }))
                    }
                    placeholder="Enter stock quantity"
                    className="w-full rounded-lg border border-gray-300 px-4 py-2.5 text-sm outline-none focus:border-black focus:ring-2 focus:ring-black/10"
                  />
                  {errors.stock_quantity && (
                    <p className="mt-1 text-sm text-red-600">
                      {errors.stock_quantity}
                    </p>
                  )}
                </div>
              </div>

              <div>
                <label className="mb-1.5 block text-sm font-medium text-gray-700">
                  Category
                </label>
                <CategoryDropdown
                  selectedCategory={formData.category_id ?? null}
                  onCategoryChange={handleCategoryChange}
                />
                {errors.category_id && (
                  <p className="mt-1 text-sm text-red-600">
                    {errors.category_id}
                  </p>
                )}
              </div>

              {mode === "edit" && (
                <div className="flex items-center gap-3">
                  <input
                    id="is_active"
                    name="is_active"
                    type="checkbox"
                    checked={formData.is_active}
                    onChange={(e) =>
                      setFormData((prev) => ({
                        ...prev,
                        is_active: e.target.checked,
                      }))
                    }
                    className="h-4 w-4 rounded border-gray-300"
                  />

                  <label
                    htmlFor="is_active"
                    className="text-sm font-medium text-gray-700"
                  >
                    {formData.is_active ? "Active Product" : "Inactive Product"}
                  </label>
                </div>
              )}
            </div>

            <div className="mt-6">
              <label className="mb-2 block text-sm font-medium text-gray-700">
                Product Image
              </label>
              <label
                htmlFor="product-image"
                className="flex min-h-48 cursor-pointer flex-col items-center justify-center rounded-xl border-2 border-dashed border-gray-300 bg-gray-50 transition hover:border-gray-400 hover:bg-gray-100"
              >
                {imagePreview ? (
                  <div className="flex flex-col items-center">
                    <img
                      src={imagePreview}
                      alt={product?.name ?? "Product"}
                      className="h-40 w-40 rounded-lg border object-cover"
                    />

                    <p className="mt-3 text-sm font-medium text-gray-700">
                      Click to change image
                    </p>

                    <button
                      type="button"
                      onClick={() => {
                        setSelectedImage(null);
                        setImagePreview(null);
                      }}
                      className="mt-2 text-sm font-medium text-red-600 hover:text-red-700 cursor-pointer"
                    >
                      Clear image
                    </button>

                    <p className="mt-1 text-xs text-gray-500">
                      JPG, PNG or WEBP
                    </p>
                  </div>
                ) : (
                  <div className="flex flex-col items-center text-center">
                    <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-gray-200">
                      <span className="text-xl">📷</span>
                    </div>

                    <p className="text-sm font-medium text-gray-700">
                      Click to upload an image
                    </p>

                    <p className="mt-1 text-xs text-gray-500">
                      JPG, PNG or WEBP
                    </p>
                  </div>
                )}

                <input
                  id="product-image"
                  type="file"
                  accept="image/jpeg,image/png,image/webp"
                  className="hidden"
                  onChange={(event) => {
                    const file = event.target.files?.[0] ?? null;
                    setSelectedImage(file);
                  }}
                />
              </label>
            </div>

            <button
              type="submit"
              disabled={
                isCreateProductPending ||
                isUpdateProductPending ||
                isUploadingProductImage ||
                isUpdatingProductImage
              }
              className="rounded-lg bg-black px-5 py-2.5 text-sm font-medium text-white disabled:opacity-50 mt-5 cursor-pointer"
            >
              {mode === "create"
                ? isCreateProductPending
                  ? "Creating..."
                  : isUploadingProductImage
                    ? "Uploading image..."
                    : "Create Product"
                : isUpdateProductPending
                  ? "Updating..."
                  : isUpdatingProductImage
                    ? "Updating image..."
                    : "Update Product"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ProductFormModal;
