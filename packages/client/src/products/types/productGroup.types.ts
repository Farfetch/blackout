import type { Product } from './product.types.js';

export type ProductGroupEntry = {
  productId: Product['result']['id'];
  merchantId: number;
  shortDescription: string;
  images: Array<{
    size: string;
    url: string;
    order: number;
  }>;
  variationProperties: [
    {
      type: string;
      property: {
        id: string;
        value: string;
      };
    },
  ];
};

export type ProductGroup = {
  totalItems: number;
  entries: ProductGroupEntry[];
};
