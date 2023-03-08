import type {
  GetProductListingQuery,
  GetProductSetQuery,
} from '@farfetch/blackout-client';
import type { ProductsListEntity } from '../../../entities/types/index.js';

export type GenerateProductsListHash = (
  // Slug from pathname.
  slug: string | number | null,
  // Object or string with query parameters.
  query?: GetProductListingQuery | GetProductSetQuery | string,
  // Options to generate the hash.
  options?: {
    // If the hash represents a set or not.
    isSet?: boolean;
  },
) => ProductsListEntity['hash'];
