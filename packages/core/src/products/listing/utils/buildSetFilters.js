import { buildQueryStringFromObject } from '../../../helpers';

/**
 * Build the correct object and query string with the received filters to add.
 *
 * @function buildSetFilters
 * @memberof module:product/listing/utils
 *
 * @param {object} query - Query params provided in the form of `{ key: value }`.
 * @param {object} filterParams - Filters to apply in the form of `{ facet: [values] }`.
 *
 * @returns {object} Object and query string built with the previous active
 * filters plus the ones provided.
 *
 * @example
 * // Returned object
 * {
 *  queryParams: {
 *      colors: [3, 11],
 *      categories: [187345]
 *  },
 *  queryString: '?colors=3|11&categories=187345&pageindex=1'
 * }
 *
 * @example
 * const facetKey = 'Value received from the UI interaction for the respective filter type'; // facetKey may be 'colors'
 * const value = 'Value received from the UI interaction for the respective filter values'; // value may be 3 or [3, 11]
 * const { navigateTo, location: { pathname, query } } = this.props;
 * const { queryParams, queryString } = buildSetFilters(query, { [facetKey]: value });
 *
 * // Use `queryParams` to have the selected filters, or example
 * <Filters selectedFilters={queryParams} />
 *
 * // Use `queryString` for navigation
 * navigateTo(urlJoin(pathname, queryString));
 */
export default (query, filterParams) => {
  const finalObject = {
    ...query,
  };

  // Build the object with the `{ facet: [values] }` structure
  for (const facet of Object.keys(filterParams)) {
    // Protect against non-iterable values
    if (!Array.isArray(filterParams[facet])) {
      filterParams[facet] = [filterParams[facet]];
    }

    if (finalObject[facet]) {
      // If a given facet already existed and it's not an array, we have to split it's value to ensure an array
      // This verification is needed because I may not send the query object from the pathname and send
      // a facet where its value is already an array
      const existingParams = Array.isArray(finalObject[facet])
        ? finalObject[facet]
        : finalObject[facet].split('|');

      finalObject[facet] = [...existingParams, ...filterParams[facet]];
    } else {
      // Otherwise we just add it
      finalObject[facet] = filterParams[facet];
    }
  }

  // Always go to first page after filtering
  finalObject.pageindex = 1;

  return {
    queryParams: finalObject,
    queryString: buildQueryStringFromObject(finalObject),
  };
};
