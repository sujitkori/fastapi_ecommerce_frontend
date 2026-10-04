import type { Product } from "../../product/types/product.types";


export interface OrderItem {
  id: number;
  product_id: number;
  quantity: number;
  price_at_purchase: number;
  product: Product;
}