/**
 * @module sizeScales/utils
 * @category SizeScales
 * @subcategory Utils
 */
import join from 'proper-url-join';

/**
 * Generate a hash with the query to identify size scale mapings results. It
 * uses `join` from `proper-url-join` because it already sorts and concatenates
 * the object to a string.
 *
 * @function
 *
 * @example
 * const sizeScaleMappingsHash = generateSizeScaleMappingsHash({
 *   gender: 0,
 *   sizeScale: 453,
 *   brand: 1664,
 * });
 * Result of sizeScaleMappingsHash === '?brand=1664&gender=0&sizeScale=453';
 *
 * @param {object} query - Query parameters applied to a size scale mapings
 * request.
 *
 * @returns {string} Generated hash to identify the size scale mapings request.
 */
export const generateSizeScaleMappingsHash = query =>
  join({ query, leadingSlash: false });
