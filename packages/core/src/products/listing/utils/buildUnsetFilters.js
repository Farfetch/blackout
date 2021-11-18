import { buildQueryStringFromObject } from '../../../helpers';

export const PRICE_FACET_KEY = 'price';
/**
 * Build the correct object and query string with the received filters to remove.
 *
 * @function buildUnsetFilters
 * @memberof module:product/listing/utils
 *
 * @param {object} query - Query params provided in the form of `{ key: value }`.
 * @param {object} filterParams - Filters to remove in the form of `{ facet: [values] }`.
 *
 * @returns {object} Object and query string built with the previous active
 * filters minus the ones provided.
 *
 * @example
 * // Returned object
 * {
 *  queryParams: {
 *      categories: [187345]
 *  },
 *  queryString: '?categories=187345&pageindex=1'
 * }
 *
 * @example
 * // Value received from the UI interaction for the respective filter type
 * const facetKey = 'colors';
 * // Value received from the UI interaction for the respective filter values (e.g. 3 or [3, 11])
 * const value = 3;
 * const { navigateTo, location: { pathname, query } } = this.props;
 * const { queryParams, queryString } = buildUnsetFilters(query, { [facetKey]: value });
 *
 * // Use `queryString` for navigation
 * navigateTo(urlJoin(pathname, queryString));
 */
export default (query, filterParams) => {
  const finalObject = {
    ...query,
  };

  for (const [facet, val] of Object.entries(filterParams)) {
    // Skip if the received facet doesn't exist
    if (!finalObject[facet]) {
      continue;
    }

    if (facet === PRICE_FACET_KEY) {
      delete finalObject[PRICE_FACET_KEY];

      continue;
    }

    const value = Array.isArray(val) ? val : [val];
    const existingParams = Array.isArray(finalObject[facet])
      ? finalObject[facet]
      : finalObject[facet].split('|');

    for (const facetId of value) {
      const index = existingParams.indexOf(String(facetId));

      if (index > -1) {
        existingParams.splice(index, 1);
      }
    }

    finalObject[facet] = existingParams.length ? existingParams : undefined;
  }

  // Always go to first page after unfiltering
  finalObject.pageindex = 1;

  return {
    queryParams: finalObject,
    queryString: buildQueryStringFromObject(finalObject),
  };
};
