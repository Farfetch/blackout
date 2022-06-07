import {
  getGroupingCurrentPageIndex,
  getGroupingError,
  getIsGroupingLoading,
} from '../reducer';
import { getProduct } from '../../../../entities/redux/selectors';
import get from 'lodash/get';

/**
 * Returns the grouping loading condition to a specific product.
 *
 * @function
 * @memberof module:products/details/selectors
 *
 * @param {object} state - Application state.
 * @param {number} id - Product id.
 *
 * @returns {boolean} If the product grouping is loading or not.
 */
export const isProductGroupingLoading = (state, id) =>
  getIsGroupingLoading(state.details)[id];

/**
 * Returns the error condition from grouping to a specific product.
 *
 * @function
 * @memberof module:products/details/selectors
 *
 * @param {object} state - Application state.
 * @param {number} id - Product id.
 *
 * @returns {object} The grouping error associated to a specific product.
 */
export const getProductGroupingError = (state, id) =>
  getGroupingError(state.details)[id];

/**
 * Gets the current page index of the given product grouping, ie, gets the last page fetched.
 * This is useful for the consumer to know were certain PDP was regarding grouping, in order to continue from here
 * when returning to that same PDP (similar to the cache behavior - the product entity already has the grouping info;
 * with this the tenant avoids requesting the  from the beginning).
 *
 * @summary Retrieves the current page index of the given product grouping.
 *
 * @function
 * @memberof module:products/details/selectors
 *
 * @param {object} state - Application state.
 * @param {number} id - Product id to get the page index from.
 *
 * @returns {number} Current page index for the requested grouping.
 */
export const getProductGroupingCurrentPageIndex = (state, id) =>
  getGroupingCurrentPageIndex(state.details)[id];

/**
 * Returns the grouping requested, without manipulations, for a given product id.
 *
 * @function
 * @memberof module:products/details/selectors
 *
 * @param {object} state - Application state.
 * @param {number} id - Product id.
 *
 * @returns {Array|undefined} The grouping requested for a given product id.
 */
export const getProductGrouping = (state, id) => {
  const product = getProduct(state, id);

  return get(product, 'grouping');
};

/**
 * Returns all the digital assets from the grouping requested for a given product id.
 *
 * @function
 * @memberof module:products/details/selectors
 *
 * @param {object} state - Application state.
 * @param {number} id - Product id.
 *
 * @returns {Array|undefined} Returns all the digital assets existent for a given product id.
 */
export const getDigitalAssetsFromGrouping = (state, id) => {
  const product = getProduct(state, id);
  const grouping = get(product, 'grouping');

  return (
    grouping &&
    grouping.reduce((acc, { entries }) => {
      acc.push(...entries);

      return acc;
    }, [])
  );
};

/**
 * Returns the grouping from a specific pageIndex.
 *
 * @function
 * @memberof module:products/details/selectors
 *
 * @param {object} state - Application state.
 * @param {number} id - Product id.
 * @param {number} pageIndex - Page index needed to find the grouping.
 *
 * @returns {object|undefined} Grouping existent for a given product id, in a specific page.
 */
export const getGroupingByPageIndex = (state, id, pageIndex) => {
  const product = getProduct(state, id);
  const grouping = get(product, 'grouping');

  return grouping && grouping.find(({ number }) => number === pageIndex);
};

/**
 * Returns the number of total pages of the grouping for a specific product.
 * This assumes that the requests always have the same `pageSize`,
 * since this trust on the first `grouping` entry to get the total pages.
 *
 * @function
 * @memberof module:products/details/selectors
 *
 * @param {object} state - Application state.
 * @param {number} id - Product id.
 *
 * @returns {number} Total pages for the requested grouping.
 */
export const getGroupingTotalPages = (state, id) => {
  const product = getProduct(state, id);
  const grouping = get(product, 'grouping');

  return get(grouping, '[0].totalPages');
};

/**
 * Determines if a given product has grouping associations.
 * This is useful to know if the grouping request is needed.
 *
 * @function
 * @memberof module:products/details/selectors
 *
 * @param {object} state - Application state.
 * @param {number} id - Product id.
 *
 * @returns {boolean|undefined} If the product has grouping to request.
 */
export const isProductWithGrouping = (state, id) => {
  const product = getProduct(state, id);

  return get(product, 'associationsInformation.hasGrouping');
};
