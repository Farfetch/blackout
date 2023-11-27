import type {
  GetProductListingQuery,
  GetProductSetQuery,
} from '@farfetch/blackout-client';
import type { ProductListingEntity } from '../../../entities/types/index.js';

export type GenerateProductListingHash = (
  // Slug from pathname.
  slug: string | number | null,
  // Object or string with query parameters.
  query?: GetProductListingQuery | GetProductSetQuery | string,
  // Options to generate the hash.
  options?: {
    // If the hash represents a set or not.
    isSet?: boolean;
    // If the slug represents a custom listing page or not.
    isCustomListingPage?: boolean;
  },
) => ProductListingEntity['hash'];
