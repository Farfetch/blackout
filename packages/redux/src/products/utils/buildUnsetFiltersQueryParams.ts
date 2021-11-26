import type { FacetEntity } from '../../entities/types';
import type { ListingQuery } from '@farfetch/blackout-client/products/types';
export const PRICE_FACET_KEY = 'price';

/**
 * Build the correct query object with the received filters to remove.
 *
 * @memberof module:products/utils
 *
 * @param {object} query - Query params provided in the form of `{ key: value }`.
 * @param {object} filterParams - Filters to remove in the form of `{ facet: [values] }`.
 *
 * @returns {object} Query object built with the previous active
 * filters minus the ones provided.
 *
 * @example
 * // Returned object
 * {
 *    categories: [187345]
 * }
 *
 * // Value received from the UI interaction for the respective filter type
 * const facetKey = 'colors';
 * // Value received from the UI interaction for the respective filter values (e.g. 3 or [3, 11])
 * const value = 3;
 * const { navigateTo, location: { pathname, query } } = this.props;
 * const queryParams = buildUnsetFiltersQueryParams(query, { [facetKey]: value });
 *
 * If you need a queryString, you can use the `buildQueryStringFromObject` util.
 * const queryString = buildQueryStringFromObject(queryParams);
 */
const buildUnsetFiltersQueryParams = (
  query: ListingQuery,
  filterParams: Record<keyof ListingQuery, number[] | number>,
): Record<string, Array<FacetEntity['id']>> => {
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

  // Always go to the first page after unfiltered
  finalObject.pageindex = 1;

  return finalObject;
};

export default buildUnsetFiltersQueryParams;
