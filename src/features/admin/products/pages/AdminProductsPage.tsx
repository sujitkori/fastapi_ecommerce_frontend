import { useState } from "react";
import ProductTable from "../components/ProductTable";
import useAdminProducts from "../hooks/useAdminProducts";
import type {
  AdminProductQueryParams,
  ProductSortFields,
  SortOrder,
} from "../types/adminProductQuery.types";
import useDebounce from "../../../../hooks/useDebounce";
import ProductFormModal from "../components/ProductFormModal";
import type { Product } from "../../../product/types/product.types";
import useDeleteProduct from "../hooks/useDeleteProduct";
import { toast } from "sonner";
import DeleteConfirmationModal from "../components/DeleteConfirmationModel";
import { getApiErrorMessage } from "../../../../utils/apiError";
// import useCategories from "../../../category/hooks/useCategories";

const AdminProductsPage = () => {
  const [queryParams, setQueryParams] = useState<AdminProductQueryParams>({
    skip: 0,
    limit: 10,

    search: "",

    category_id: undefined, //We are using undefined because Axios ignores undefined values, while null gets sent as category_id=null. Same for others.

    min_price: undefined as number | undefined,
    max_price: undefined as number | undefined,

    sort_by: undefined as ProductSortFields | undefined,
    sort_order: undefined as SortOrder | undefined,
  });

  const debouncedSearch = useDebounce(queryParams.search ?? "", 500);

  // const {data: categories, isPending:isCategoriesPending, isError:isCatgoriesError}= useCategories();

  const { data, isPending, isError, error } = useAdminProducts({
    ...queryParams,
    search: debouncedSearch,
  });

  const [isProductModalOpen, setIsProductModalOpen] = useState(false);

  const [modalMode, setModalMode] = useState<"create" | "edit">("create");
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [productToDelete, setProductToDelete] = useState<Product | null>(null);

  const { mutate: deleteProduct, isPending: isDeletingPending } =
    useDeleteProduct();

  const currentPage = Math.floor((queryParams.skip ?? 0) / (queryParams.limit || 10)) + 1;

  const totalPages = Math.ceil((data?.total || 0)/ (queryParams.limit || 10));

  const handleSearchChange = (value: string) => {
    setQueryParams((prev) => ({
      ...prev,
      search: value,
      skip: 0,
    }));
  };

  const handleCategoryChange = (categoryId: number | undefined) => {
    setQueryParams((prev) => ({
      ...prev,
      category_id: categoryId,
      skip: 0,
    }));
  };

  const handleSortChange = (value: string) => {
    if (value === "") {
      setQueryParams((prev) => ({
        ...prev,
        sort_by: undefined,
        sort_order: undefined,
        skip: 0,
      }));

      return;
    }

    const lastUnderscoreIndex = value.lastIndexOf("_");

    const sortBy = value.slice(0, lastUnderscoreIndex) as ProductSortFields;
    const sortOrder = value.slice(lastUnderscoreIndex + 1) as SortOrder;

    setQueryParams((prev) => ({
      ...prev,
      sort_by: sortBy,
      sort_order: sortOrder,
      skip: 0,
    }));
  };

  const handlePageChange = (page: number) => {
    setQueryParams((prev) => ({
      ...prev,
      skip: (page - 1) * (prev.limit ?? 10),
    }));
  };

  const handlePriceChange = (value: [number, number]) => {
    setQueryParams((prev) => ({
      ...prev,
      min_price: value[0],
      max_price: value[1],
      skip: 0,
    }));
  };

  const handleProductModal = () => {
    setIsProductModalOpen(false);
  };

  const handleOnAddProduct = () => {
    setSelectedProduct(null);
    setModalMode("create");
    setIsProductModalOpen(true);
  };

  const handleEditProduct = (product: Product) => {
    setSelectedProduct(product);
    setModalMode("edit");
    setIsProductModalOpen(true);
  };

  const handleDeleteProduct = (product: Product) => {
    setProductToDelete(product);
  };

  const handleCancelDelete = () => {
    setProductToDelete(null);
  };

  const handleConfirmDelete = () => {
    if (!productToDelete) {
      return;
    }

    deleteProduct(productToDelete.id, {
      onSuccess: (data) => {
        toast.success(data.message);
        setProductToDelete(null);
      },
      onError:(error) => {
        toast.error(
          getApiErrorMessage(error, "Failed to delete product.")
        )
      }
    });
  };

  if (isPending && !data) {
    return (
      <div className="flex justify-center items-center py-20">
        <p className="text-lg text-gray-500">Loading products...</p>
      </div>
    );
  }

  if (isError) {
  return (
    <div className="flex justify-center items-center py-20">
      <p className="text-lg text-red-600">
        {getApiErrorMessage(error, "Failed to load products.")}
      </p>
    </div>
  );
}

  if (!data || data.data.length === 0) {
    return (
      <div className="py-20 text-center">
        <h2 className="text-xl font-semibold text-gray-700">
          No Products Found
        </h2>

        <p className="mt-2 text-gray-500">There are currently no products.</p>
      </div>
    );
  }

  return (
    <div className="p-8">
      <ProductTable
        products={data.data}
        search={queryParams.search ?? ""}
        onSearchChange={handleSearchChange}
        selectedCategory={queryParams.category_id}
        onCategoryChange={handleCategoryChange}
        selectedSort={
          queryParams.sort_by && queryParams.sort_order
            ? `${queryParams.sort_by}_${queryParams.sort_order}`
            : ""
        }
        onSortChange={handleSortChange}
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={handlePageChange}
        minPrice={queryParams.min_price}
        maxPrice={queryParams.max_price}
        availableMinPrice={data.available_min_price}
        availableMaxPrice={data.available_max_price}
        onPriceChange={handlePriceChange}
        onAddProduct={handleOnAddProduct}
        onEditProduct={handleEditProduct}
        onDeleteProduct={handleDeleteProduct}
      />

      <ProductFormModal
        isOpen={isProductModalOpen}
        mode={modalMode}
        onClose={handleProductModal}
        product={selectedProduct}
      />

      <DeleteConfirmationModal
        isOpen={!!productToDelete}
        productName={productToDelete?.name}
        isPending={isDeletingPending}
        onConfirm={handleConfirmDelete}
        onCancel={handleCancelDelete}
      />
    </div>
  );
};

export default AdminProductsPage;
