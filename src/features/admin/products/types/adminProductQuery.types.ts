export type ProductSortFields =
  | "name"
  | "price"
  | "stock_quantity"
  | "created_at";

export type SortOrder = "asc" | "desc";

export interface AdminProductQueryParams {
  skip?: number;
  limit?: number;

  search?: string;

  category_id?: number;

  min_price?: number;
  max_price?: number;

  sort_by?: ProductSortFields;
  sort_order?: SortOrder;
}