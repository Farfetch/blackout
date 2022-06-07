import { buildQueryStringFromObject } from '../helpers';
import type { BrandsQuery } from '@farfetch/blackout-client/brands/types';

/**
 * Generate a hash with the query to identify brands results.
 *
 * @example
 * ```
 * const brandsHash = buildDesignersHash({categoryId: '123'});
 * Result of brandsHash === 'brands?categoryId=123';
 *
 * ```
 *
 * @param query - Query parameters applied to a brands request.
 *
 * @returns Hash built to identify a brands request.
 */
export const generateBrandsHash = (query: BrandsQuery): string =>
  `brands${buildQueryStringFromObject(query)}`;
