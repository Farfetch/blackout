import type {
  ListingQuery,
  SetQuery,
} from '@farfetch/blackout-client/products/types';
import type { ProductsListEntity } from '../../../entities/types';

export type GenerateProductsListHash = (
  // Slug from pathname.
  slug: string | number | null,
  // Object or string with query parameters.
  query?: ListingQuery | SetQuery,
  // Options to generate the hash.
  {
    isSet,
  }?: {
    // If the hash represents a set or not.
    isSet?: boolean;
  },
) => ProductsListEntity['hash'];
