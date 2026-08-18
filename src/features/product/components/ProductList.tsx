import { getApiErrorMessage } from "../../../utils/apiError";
import type { Product } from "../types/product.types";
import ProductCard from "./ProductCard";

interface ProductListProps {
  products: Product[];
  isPending: boolean;
  isError: boolean;
  error: Error | null;
}

const ProductList = ({
  products,
  isPending,
  isError,
  error,
}: ProductListProps) => {
  if (isPending) {
    return <h2>Loading...</h2>;
  }

  if (isError) {
    return (
      <h2 className="text-red-600">
        {getApiErrorMessage(error, "Failed to load products.")}
      </h2>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {products.map((product) => {
        return <ProductCard key={product.id} product={product} />;
      })}
    </div>
  );
};

export default ProductList;
