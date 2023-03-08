import type { StructuredProductData } from './product.types.js';

export type StructuredProductListing = {
  entries: Array<StructuredProductData>;
  totalItems: number;
  name: string;
};
