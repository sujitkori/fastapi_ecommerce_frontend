import { getImageUrl } from "../../../../utils/image";
import type { Product } from "../../../product/types/product.types";
import placeholderImage from "../../../../assets/images/product-placeholder.png";
import CategoryDropdown from "../../../category/components/CategoryDropdown";
import PriceRangeSliderAdmin from "./PriceRangeSliderAdmin";
// import type { Category } from "../../../category/types/category.types";

interface ProductTableProps {
  products: Product[];
  search: string;
  onSearchChange: (value: string) => void;

  selectedCategory: number | undefined;
  onCategoryChange: (value: number | undefined) => void;

  selectedSort: string;
  onSortChange: (value: string) => void;

  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;

  minPrice: number | undefined;
  maxPrice: number | undefined;

  availableMinPrice: number;
  availableMaxPrice: number;

  onPriceChange: (value: [number, number]) => void;
  onAddProduct:() => void;

  onEditProduct:(value:Product) => void;
  onDeleteProduct:(vaue:Product) => void;
}

const ProductTable = ({
  products,
  search,
  onSearchChange,
  selectedCategory,
  onCategoryChange,
  selectedSort,
  onSortChange,
  currentPage,
  totalPages,
  onPageChange,
  minPrice,
  maxPrice,
  availableMinPrice,
  availableMaxPrice,
  onPriceChange,
  onAddProduct,
  onEditProduct,
  onDeleteProduct
}: ProductTableProps) => {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between px-6 py-5 border-b border-gray-200">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Products</h1>
          <p className="mt-1 text-sm text-gray-500">
            Manage your store products
          </p>
        </div>

        <button 
        className="rounded-lg bg-black px-5 py-2.5 text-sm font-medium text-white hover:bg-gray-800 transition cursor-pointer"
        onClick={onAddProduct}
        >
          + Add Product
        </button>
      </div>

      {/* Search */}
      <div className="flex flex-row gap-5 items-center border-b border-gray-200 px-6 py-4">
        <input
          type="text"
          placeholder="Search products..."
          value={search}
          onChange={(e) => onSearchChange(e.target.value)}
          className="w-full max-w-56 rounded-lg border border-gray-300 px-4 py-2 text-sm outline-none focus:border-black focus:ring-2 focus:ring-black/10"
        />

        <CategoryDropdown
          selectedCategory={selectedCategory}
          onCategoryChange={onCategoryChange}
        />

        <select
          value={selectedSort}
          onChange={(e) => onSortChange(e.target.value)}
          className="rounded-lg border border-gray-300 px-4 py-2 text-sm outline-none focus:border-black focus:ring-2 focus:ring-black/10"
        >
          <option value="">Sort By</option>

          <option value="name_asc">Name: A → Z</option>
          <option value="name_desc">Name: Z → A</option>

          <option value="price_asc">Price: Low → High</option>
          <option value="price_desc">Price: High → Low</option>

          <option value="stock_quantity_asc">Stock: Low → High</option>

          <option value="stock_quantity_desc">Stock: High → Low</option>

          <option value="created_at_asc">Created: Oldest → Newest</option>

          <option value="created_at_desc">Created: Newest → Oldest</option>
        </select>

        {/* Price Range Slider */}
        <PriceRangeSliderAdmin
          value={[
            minPrice ?? availableMinPrice,
            maxPrice ?? availableMaxPrice,
          ]}
          min={availableMinPrice}
          max={availableMaxPrice}
          onValueChange={onPriceChange}
        />
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-gray-600">
                Image
              </th>

              <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-gray-600">
                Product
              </th>

              <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-gray-600">
                Category
              </th>

              <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-gray-600">
                Price
              </th>

              <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-gray-600">
                Stock
              </th>

              <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-gray-600">
                Status
              </th>

              <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-gray-600">
                Actions
              </th>
            </tr>
          </thead>

          <tbody className="divide-y divide-gray-100 bg-white">
            {products?.map((product) => (
              <tr
                key={product.id}
                className="hover:bg-gray-50 transition-colors"
              >
                {/* Image */}
                <td className="px-6 py-4">
                  <img
                    src={getImageUrl(product?.image) || placeholderImage}
                    alt={product.name}
                    className="h-14 w-14 rounded-lg object-cover border"
                  />
                </td>

                {/* Name */}
                <td className="px-6 py-4">
                  <div className="font-medium text-gray-900">
                    {product.name}
                  </div>

                  <div className="text-sm text-gray-500 truncate max-w-xs">
                    {product.description}
                  </div>
                </td>

                {/* Category */}
                <td className="px-6 py-4 text-sm text-gray-700">
                  {product.category?.name ?? "-"}
                </td>

                {/* Price */}
                <td className="px-6 py-4 font-medium text-gray-900">
                  ₹{new Intl.NumberFormat("en-IN").format(product?.price)}
                </td>

                {/* Stock */}
                <td className="px-6 py-4 text-sm text-gray-700">
                  {product.stock_quantity}
                </td>

                {/* Status */}
                <td className="px-6 py-4">
                  {product.is_active ? (
                    <span className="inline-flex rounded-full bg-green-100 px-3 py-1 text-xs font-semibold text-green-700">
                      Active
                    </span>
                  ) : (
                    <span className="inline-flex rounded-full bg-red-100 px-3 py-1 text-xs font-semibold text-red-700">
                      Inactive
                    </span>
                  )}
                </td>

                {/* Actions */}
                <td className="px-6 py-4">
                  <div className="flex gap-2">
                    <button 
                    className="rounded-md bg-blue-600 px-3 py-1.5 text-sm text-white hover:bg-blue-700 cursor-pointer"
                    onClick={() => onEditProduct(product)}
                    >
                      Edit
                    </button>

                    <button 
                    className="rounded-md bg-red-600 px-3 py-1.5 text-sm text-white hover:bg-red-700 cursor-pointer"
                    onClick={() => onDeleteProduct(product)}
                    >
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <div className="flex items-center justify-between border-t border-gray-200 px-6 py-4">
          <p className="text-sm text-gray-600">
            Page {currentPage} of {totalPages}
          </p>

          <div className="flex items-center gap-2">
            <button
              onClick={() => onPageChange(currentPage - 1)}
              disabled={currentPage === 1}
              className="rounded-md border border-gray-300 px-3 py-1.5 text-sm text-gray-700 hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-50"
            >
              Previous
            </button>

            <button
              onClick={() => onPageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
              className="rounded-md border border-gray-300 px-3 py-1.5 text-sm text-gray-700 hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-50"
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductTable;
