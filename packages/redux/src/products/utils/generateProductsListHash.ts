import { buildQueryStringFromObject } from '../../helpers';
import isObject from 'lodash/isObject';
import isString from 'lodash/isString';
import parse from 'url-parse';
import type {
  ListingQuery,
  SetQuery,
} from '@farfetch/blackout-client/products/types';
import type { ProductsListEntity } from '../../entities/types';

/**
 * Build a hash with slug and query to identify products lists
 * (listings or sets).
 *
 * @memberof module:products/utils
 *
 * @example
 * const query = { sort: 'price' };
 * const productsListHash = generateProductsListHash(slug, query);
 * const productsListHash = generateProductsListHash(slug, query, {
 *    isSet: true
 * });
 *
 * Result of productsListHash === 'listing/woman/clothing?sort=price';
 *
 * @param {string|number|null} slug - Slug from pathname.
 * @param {object|string} [query] - Object or string with query parameters.
 * @param {object} [hashOptions] - Options to generate the hash.
 * @param {bool} [hashOptions.isSet] - If the hash represents a set or not.
 *
 * @returns {string} Hash builded to identify a products list.
 */
const generateProductsListHash = (
  slug: string | number | null,
  query?: ListingQuery | SetQuery,
  { isSet }: { isSet?: boolean } = {},
): ProductsListEntity['hash'] => {
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
  const parsedQueryString = buildQueryStringFromObject(finalQuery);

  return `${productsListScope}${parsedSlug}${parsedQueryString}`;
};

export default generateProductsListHash;
