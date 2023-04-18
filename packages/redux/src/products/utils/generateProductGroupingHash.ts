import { buildQueryStringFromObject } from '../../helpers/index.js';
import type { GenerateProductGroupingHash } from './types/generateProductGroupingHash.types.js';

/**
 * Build a hash with query to identify a product grouping.
 *
 * @example
 * ```
 * const query = { properties: 'colour:1,volume:2' };
 * const productGroupingHash = generateProductGroupingHash(query);
 * Result of productGroupingHash === '?properties=colour:1,volume:2';
 *
 * ```
 * @param query - Get product grouping request query.
 *
 * @returns Hash built to identify a product grouping.
 */
const generateProductGroupingHash: GenerateProductGroupingHash = query => {
  const queryString = query && buildQueryStringFromObject(query);

  return queryString ? queryString : '!all';
};

export default generateProductGroupingHash;
