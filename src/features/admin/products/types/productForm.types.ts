interface ProductFormBase {
  name: string;
  description: string;
  price: number;
  stock_quantity: number;
  category_id: number | undefined;
  is_active:boolean;
}

export interface ProductCreateFormData extends ProductFormBase {}

export interface ProductUpdateFormData extends ProductFormBase {
  is_active: boolean;
}

export type UpdateProductVariables = {
  productId: number;
  productData: ProductUpdateFormData;
};

export interface DeleteProductResponse {
  message: string;
}