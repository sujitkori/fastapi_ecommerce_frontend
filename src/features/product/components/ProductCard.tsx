import { getImageUrl } from "../../../utils/image";
import type { Product } from "../types/product.types"
import placeholderImage from "../../../assets/images/product-placeholder.png"
import { Link } from "react-router-dom";

interface ProductCardProps {
  product: Product
}

const ProductCard = ({ product }: ProductCardProps) => {

  return (
    <Link to={`/products/${product.id}`} className="border rounded-lg p-5 shadow transition-all duration-300 hover:shadow-xl">
      <div className="h-56 w-full overflow-hidden rounded-md bg-gray-100 mb-4">
        <img
          src={product.image ? getImageUrl(product.image) : placeholderImage}
          alt={product.name}
          className="w-full h-56 object-cover rounded-md mb-4"
        />
      </div>

      <h2 className="text-xl font-semibold">
        {product.name}
      </h2>

      <p className="mt-3 text-lg font-bold text-blue-600">
        ₹{new Intl.NumberFormat("en-IN").format(product.price)}
      </p>

      <p className="mt-2 text-gray-600">
        Category: {product.category?.name}
      </p>

      <p className="text-gray-600">
        Stock: {product.stock_quantity}
      </p>
    </Link>
  )
}

export default ProductCard
