/**
 * @module brands/utils
 * @category Brands
 * @subcategory Utils
 */

import { buildQueryStringFromObject } from '../helpers';
import type { BrandsQuery } from '@farfetch/blackout-client/brands/types';

/**
 * Generate a hash with the query to identify brands results.
 *
 * @function
 *
 * @example
 * const brandsHash = buildDesignersHash({categoryId: '123'});
 * Result of brandsHash === 'brands?categoryId=123';
 *
 * @param {object} query - Query parameters applied to a brands request.
 *
 * @returns {string} Hash built to identify a brands request.
 */
export const generateBrandsHash = (query: BrandsQuery): string =>
  `brands${buildQueryStringFromObject(query)}`;
