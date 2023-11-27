import { buildQueryStringFromObject } from '../../helpers/index.js';
import { isObject, isString } from 'lodash-es';
import parse from 'url-parse';
import type { GenerateProductListingHash } from './types/index.js';

/**
 * Build a hash with slug and query to identify products lists (listings or sets).
 *
 * @example
 * ```
 * const query = { sort: 'price' };
 * const productListHash = generateProductListingHash(slug, query);
 * const productListHash = generateProductListingHash(slug, query, {
 *    isSet: true
 * });
 *
 * Result of productListHash === 'listing/woman/clothing?sort=price';
 *
 * ```
 * In case of custom listig page
 *
 * @example
 * ```
 * const productListHash = generateProductListingHash(slug, query, {
 *    isCustomListingPage: true
 * });
 *
 * Result of productListHash === 'listing/customlistingpage';
 * ```
 *
 * @param slug        - Slug from pathname.
 * @param query       - Object or string with query parameters.
 * @param hashOptions - Options to generate the hash.
 *
 * @returns Hash built to identify a product list.
 */
const generateProductListingHash: GenerateProductListingHash = (
  slug,
  query,
  { isSet, isCustomListingPage } = {},
) => {
  let finalQuery = {};
  let productsListScope = 'listing';

  if (isSet) {
    productsListScope = 'sets';
  }

  if (isObject(query)) {
    finalQuery = query;
  }

  // If the query is a string should be transformed to an object,
  // with parse function from url-parse package. This is necessary because
  // on SSR the query is retrieved from `model.pathname`.
  //
  // Example:
  // const queryParams = '?sortdirection=asc&pageIndex=1';
  // const queryObj = parse(queryParams);
  // Result of queryObj === { sortdirection: asc, pageindex:1};
  if (isString(query)) {
    finalQuery = parse(query, true).query;
  }

  const parsedSlug =
    slug && (typeof slug === 'number' || slug.charAt(0) !== '/')
      ? `/${slug}`
      : slug;

  if (isCustomListingPage) {
    return `${productsListScope}${parsedSlug}`;
  }

  const parsedQueryString = buildQueryStringFromObject(finalQuery);

  return `${productsListScope}${parsedSlug}${parsedQueryString}`;
};

export default generateProductListingHash;
