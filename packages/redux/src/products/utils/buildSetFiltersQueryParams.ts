import type { FacetEntity } from '../../entities/types';
import type { GetProductListingQuery } from '@farfetch/blackout-client';

/**
 * Build the correct query object with the received filters to add.
 *
 * @example
 * ```
 * // Returned object
 * {
 *    colors: [3, 11],
 *    categories: [187345]
 * }
 *
 * const facetKey = 'Value received from the UI interaction for the respective filter type'; // facetKey may be 'colors'
 * const value = 'Value received from the UI interaction for the respective filter values'; // value may be 3 or [3, 11]
 * const { navigateTo, location: { pathname, query } } = this.props;
 * const queryParams = buildSetFiltersQueryParams(query, { [facetKey]: value });
 *
 * // Use `queryParams` to have the selected filters, or example
 * <Filters selectedFilters={queryParams} />
 *
 * If you need a queryString, you can use the `buildQueryStringFromObject` util.
 * const queryString = buildQueryStringFromObject(queryParams);
 * ```
 *
 * @param query        - Query params provided in the form of `{ key: value }`.
 * @param filterParams - Filters to apply in the form of `{ facet: [values] }`.
 *
 * @returns Query object and query string built with the previous active filters plus the ones
 * provided.
 */
const buildSetFiltersQueryParams = (
  query: GetProductListingQuery,
  filterParams: Record<string, string[] | number[] | number>,
): Record<string, Array<FacetEntity['id']>> => {
  const finalObject = {
    ...query,
  };

  // Build the object with the `{ facet: [values] }` structure
  for (const facet of Object.keys(filterParams)) {
    // Protect against non-iterable values
    if (!Array.isArray(filterParams[facet])) {
      filterParams[facet] = [filterParams[facet]] as number[] | string[];
    }

    if (finalObject[facet]) {
      // If a given facet already existed and it's not an array, we have to split it's value to ensure an array
      // This verification is needed because I may not send the query object from the pathname and send
      // a facet where its value is already an array
      const existingParams = Array.isArray(finalObject[facet])
        ? finalObject[facet]
        : finalObject[facet].split('|');

      finalObject[facet] = [
        ...existingParams,
        ...(filterParams[facet] as number[]),
      ];
    } else {
      // Otherwise we just add it
      finalObject[facet] = filterParams[facet];
    }
  }

  // Always go to first page after filtering
  finalObject.pageindex = 1;

  return finalObject;
};

export default buildSetFiltersQueryParams;
