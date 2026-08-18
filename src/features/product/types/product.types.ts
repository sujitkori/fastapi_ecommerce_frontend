import type { Category } from "../../category/types/category.types";

export interface Product {
    id: number;
    name: string;
    description: string;
    price: number;
    stock_quantity: number;
    category_id: number;

    is_active: boolean;
    image: string | null;

    average_rating: number | null;
    review_count: number;

    created_at: string | null;
    updated_at: string | null;

    category: Category | null;
}

export interface ProductListResponse {
    total:number;
    skip:number;
    limit:number;
    available_min_price: number;
    available_max_price: number;
    data:Product[];
}