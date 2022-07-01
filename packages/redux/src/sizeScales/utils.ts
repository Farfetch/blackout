import join from 'proper-url-join';
import type { SizeScaleMappingsQuery } from '@farfetch/blackout-client';

/**
 * Generate a hash with the query to identify size scale mappings results. It uses
 * `join` from `proper-url-join` because it already sorts and concatenates the
 * object to a string.
 *
 * @example
 * ```
 * const sizeScaleMappingsHash = generateSizeScaleMappingsHash({
 *   gender: 0,
 *   sizeScale: 453,
 *   brand: 1664,
 * });
 * Result of sizeScaleMappingsHash === '?brand=1664&gender=0&sizeScale=453';
 *
 * ```
 *
 * @param query - Query parameters applied to a size scale mappings request.
 *
 * @returns Generated hash to identify the size scale mappings request.
 */
export const generateSizeScaleMappingsHash = (
  query: SizeScaleMappingsQuery,
): string => join('', { query, leadingSlash: false });
