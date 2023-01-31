import { createSelector } from 'reselect';
import { getProduct } from '../../../../entities/redux/selectors';
import { getSetError as getSetErrorReducer, getSetIsLoading } from '../reducer';
import get from 'lodash/get';

/**
 * Returns the loading status of a given set.
 *
 * @function
 * @memberof module:products/details/selectors
 *
 * @param {object} state - Application state.
 * @param {number} id - Set id.
 *
 * @returns {boolean} If the set is loading or not.
 */
export const isSetLoading = (state, id) => getSetIsLoading(state.details)[id];

/**
 * Returns the fetched status of a given set.
 *
 * @function
 * @memberof module:products/details/selectors
 *
 * @param {object} state - Application state.
 * @param {number} id - Set id.
 *
 * @returns {boolean} If the set has beed fetched or not.
 */
export const isSetFetched = (state, id) =>
  getSetIsLoading(state.details).hasOwnProperty(id) &&
  isSetLoading(state, id) === false;

/**
 * Returns the error of a given set.
 *
 * @function
 * @memberof module:products/details/selectors
 *
 * @param {object} state - Application state.
 * @param {number} id - Set id.
 *
 * @returns {object} The error associated to the given set.
 */
export const getSetError = (state, id) => getSetErrorReducer(state.details)[id];

/**
 * Gets the related sets of a specific type from a given product.
 *
 * @function
 * @memberof module:products/details/selectors
 *
 * @param {object} state - Application state.
 * @param {number} productId - Product id to get the related sets from.
 * @param {number} setType - Desired set type to filter.
 *
 * @returns {Array} Related sets of the given type.
 */
export const getProductRelatedSetsIdsByType = createSelector(
  (state, productId) => getProduct(state, productId),
  (state, productId, setType) => setType,
  (product, setType) => {
    const relatedSetsIds = get(product, 'relatedSets', []);

    return relatedSetsIds.reduce((acc, relatedSet) => {
      if (relatedSet.setType === setType) {
        acc.push(relatedSet.setId);
      }

      return acc;
    }, []);
  },
);
