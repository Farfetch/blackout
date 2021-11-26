import type { Product } from './product.types';

export type ProductGroupEntry = {
  productId: Product['result']['id'];
  merchantId: number;
  shortDescription: string;
  images: Array<{
    size: string;
    url: string;
    order: number;
  }>;
};

export type ProductGroup = {
  totalItems: number;
  entries: ProductGroupEntry[];
};
