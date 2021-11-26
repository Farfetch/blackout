import type { Product } from './product.types';

export type Listing = {
  entries: Array<Product>;
  products?: {
    totalItems: number;
  };
  name: string;
};
