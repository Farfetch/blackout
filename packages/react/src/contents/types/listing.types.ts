import type { StructuredProductData } from './product.types';

export type StructuredProductListing = {
  entries: Array<StructuredProductData>;
  totalItems: number;
  name: string;
};
