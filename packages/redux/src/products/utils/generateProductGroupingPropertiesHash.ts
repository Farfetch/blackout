import { buildQueryStringFromObject } from '../../helpers/index.js';
import type { GenerateProductGroupingPropertiesHash } from './types/generateProductGroupingPropertiesHash.types.js';

/**
 * Build a hash with query to identify product grouping properties.
 *
 * @example
 * ```
 * const query = { hasStock: true };
 * const productGroupingPropertiesHash = generateProductGroupingPropertiesHash(query);
 * Result of productGroupingPropertiesHash === '?hasStock=true';
 *
 * ```
 * @param query - Get product grouping properties request query.
 *
 * @returns Hash built to identify a product grouping.
 */
const generateProductGroupingPropertiesHash: GenerateProductGroupingPropertiesHash =
  query => {
    const queryString = query && buildQueryStringFromObject(query);

    return queryString ? queryString : '!all';
  };

export default generateProductGroupingPropertiesHash;
