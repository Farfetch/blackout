import {
  getColorGroupingCurrentPageIndex,
  getColorGroupingError,
  getIsColorGroupingLoading,
} from '../reducer';
import { getProduct } from '../../../../entities/redux/selectors';
import get from 'lodash/get';

/**
 * Returns the color grouping loading condition to a specific product.
 *
 * @function
 * @memberof module:products/details/selectors
 *
 * @param {object} state - Application state.
 * @param {number} id - Product id.
 *
 * @returns {boolean} If the product color grouping is loading or not.
 */
export const isProductColorGroupingLoading = (state, id) =>
  getIsColorGroupingLoading(state.details)[id];

/**
 * Returns the error condition from color grouping to a specific product.
 *
 * @function
 * @memberof module:products/details/selectors
 *
 * @param {object} state - Application state.
 * @param {number} id - Product id.
 *
 * @returns {object} The color grouping error associated to a specific product.
 */
export const getProductColorGroupingError = (state, id) =>
  getColorGroupingError(state.details)[id];

/**
 * Gets the current page index of the given product color grouping, ie, gets the last page fetched.
 * This is useful for the consumer to know were certain PDP was regarding color grouping, in order to continue from here
 * when returning to that same PDP (similar to the cache behaviour - the product entity already has the color grouping info;
 * with this the tenant avoids requesting the colors from the beginning).
 *
 * @summary Retrieves the current page index of the given product color grouping.
 *
 * @function
 * @memberof module:products/details/selectors
 *
 * @param {object} state - Application state.
 * @param {number} id - Product id to get the color page index from.
 *
 * @returns {number} Current page index for the requested color grouping.
 */
export const getProductColorGroupingCurrentPageIndex = (state, id) =>
  getColorGroupingCurrentPageIndex(state.details)[id];

/**
 * Returns the color grouping requested, without manipulations, for a given product id.
 *
 * @function
 * @memberof module:products/details/selectors
 *
 * @param {object} state - Application state.
 * @param {number} id - Product id.
 *
 * @returns {Array|undefined} The color grouping requested for a given product id.
 */
export const getProductColorGrouping = (state, id) => {
  const product = getProduct(state, id);

  return get(product, 'colorGrouping');
};

/**
 * Returns all the digital assets from the color grouping requested for a given product id.
 *
 * @function
 * @memberof module:products/details/selectors
 *
 * @param {object} state - Application state.
 * @param {number} id - Product id.
 *
 * @returns {Array|undefined} Returns all the digital assets (colors) existent for a given product id.
 */
export const getDigitalAssetsFromColorGrouping = (state, id) => {
  const product = getProduct(state, id);
  const colorGrouping = get(product, 'colorGrouping');

  return (
    colorGrouping &&
    colorGrouping.reduce((acc, { entries }) => {
      acc.push(...entries);

      return acc;
    }, [])
  );
};

/**
 * Returns the color grouping from a specific pageIndex.
 *
 * @function
 * @memberof module:products/details/selectors
 *
 * @param {object} state - Application state.
 * @param {number} id - Product id.
 * @param {number} pageIndex - Page index needed to find the color grouping.
 *
 * @returns {object|undefined} Color existent for a given product id, in a specific page.
 */
export const getColorGroupingByPageIndex = (state, id, pageIndex) => {
  const product = getProduct(state, id);
  const colorGrouping = get(product, 'colorGrouping');

  return (
    colorGrouping && colorGrouping.find(({ number }) => number === pageIndex)
  );
};

/**
 * Returns the number of total pages of the color grouping for a specific product.
 * This asumes that the requests always have the same `pageSize`,
 * since this trust on the first `colorGrouping` entry to get the total pages.
 *
 * @function
 * @memberof module:products/details/selectors
 *
 * @param {object} state - Application state.
 * @param {number} id - Product id.
 *
 * @returns {number} Total pages for the requested color grouping.
 */
export const getColorGroupingTotalPages = (state, id) => {
  const product = getProduct(state, id);
  const colorGrouping = get(product, 'colorGrouping');

  return get(colorGrouping, '[0].totalPages');
};

/**
 * Determines if a given product has color grouping associations.
 * This is useful to know if the color grouping request is needed.
 *
 * @function
 * @memberof module:products/details/selectors
 *
 * @param {object} state - Application state.
 * @param {number} id - Product id.
 *
 * @returns {boolean|undefined} If the product has colors grouping to request.
 */
export const isProductWithColorGrouping = (state, id) => {
  const product = getProduct(state, id);

  return get(product, 'associationsInformation.hasColorGrouping');
};
