import { buildQueryStringFromObject } from '../../../helpers';
import isObject from 'lodash/isObject';
import isString from 'lodash/isString';
import parse from 'url-parse';

/**
 * Build a hash with slug, subfolder and query to identify listings.
 *
 * @function buildListingHash
 * @memberof module:product/listing/utils
 *
 * @example
 * const listingHash = buildListingHash('/en-gb', 'listing/woman/clothing', {sort: 'price'});
 * const listingHash = buildListingHash('/en-gb', 'listing/woman/clothing', '?sort=price');
 * Result of listingHash === '/en-gb/listing/woman/clothing?sort=price';
 *
 * @param {string} subfolder - Current subfolder.
 * @param {string} slug - Slug from pathname.
 * @param {object|string} query - Object or string with query parameters
 * applied to listing.
 *
 * @returns {string} Hash builded to identify a listing.
 */
export default (subfolder, slug, query) => {
  let finalQuery = {};

  if (isObject(query)) {
    finalQuery = query;
  }

  // If the query is a string should be transformed to an object,
  // with parse function from url-parse package. This is necessary because
  // on SSR the query is retrived from pathname catched from the model.
  //
  // Example:
  // const queryParams = '?sortdirection=asc&pageIndex=1';
  // const queryObj = parse(queryParams);
  // Result of queryObj === { sortdirection: asc, pageindex:1};
  if (isString(query)) {
    finalQuery = parse(query, true).query;
  }

  const trailingSlash = subfolder && subfolder.charAt(0) === '/' ? '' : '/';

  return `${trailingSlash}${subfolder}${slug}${buildQueryStringFromObject(
    finalQuery,
  )}`;
};
