/**
 * @module brands/selectors
 * @category Brands
 * @subcategory Selectors
 */

import { createSelector } from 'reselect';
import { getBrands } from '../../entities/redux';
import { getError, getHash, getIsLoading, getResult } from './reducer';

/**
 * Retrieves the current brands hash.
 *
 * @function
 *
 * @param {object} state - Application state.
 *
 * @see {module:brands/actions.fetchBrands}
 *
 * @returns {string} Brands identifier to the last request for fetchBrands.
 */
export const getBrandsHash = state => getHash(state.brands);

/**
 * Returns error for one brand - fetchBrand request.
 *
 * @function
 *
 * @param {object} state - Application state.
 * @param {number} id - Brand identifier.
 *
 * @see {module:brands/actions.fetchBrand}
 *
 * @returns {object} Brand error.
 */
export const getBrandError = (state, id) => getError(state.brands)[id];

/**
 * Returns the error for brands - fetchBrands request.
 *
 * @function
 *
 * @param {object} state - Application state.
 * @param {string} hash - Brands identifier for fetch brands request composed by query.
 *
 * @see {module:brands/actions.fetchsBrand}
 *
 * @returns {object} Brands error.
 */
export const getBrandsError = (state, hash = getBrandsHash(state)) =>
  getError(state.brands)[hash];

/**
 * Returns the loading status for one brand - fetchBrand request.
 *
 * @function
 *
 * @param {object} state - Application state.
 * @param {number} id - Brand identifier.
 *
 * @see {module:brands/actions.fetchBrand}
 *
 * @returns {boolean} Loading status corresponding to a fetchBrand request.
 */
export const isBrandLoading = (state, id) => getIsLoading(state.brands)[id];

/**
 * Returns the loading status for brands - fetchBrands request.
 *
 * @function
 *
 * @param {object} state - Application state.
 * @param {string} hash - Brands identifier for fetch brands request composed by query.
 *
 * @see {module:brands/actions.fetchBrands}
 *
 * @returns {boolean} Loading status corresponding to a fetchBrands request.
 */
export const areBrandsLoading = (state, hash = getBrandsHash(state)) =>
  getIsLoading(state.brands)[hash];

/**
 * Returns the brands result provenient from fetchBrands request.
 *
 * @function
 *
 * @param {object} state - Application state.
 * @param {string} hash - Brands identifier for fetch brands request composed by query.
 *
 * @see {module:brands/actions.fetchBrands}
 *
 * @returns {object|undefined} Brands result with pagination.
 */
export const getBrandsResult = createSelector(
  [
    (state, hash = getBrandsHash(state)) => hash,
    state => getResult(state.brands),
    getBrands,
  ],
  (hash, brandsResult, brands) => {
    const result = brandsResult?.[hash];

    if (!result) {
      return;
    }

    return {
      ...result,
      entries: result.entries.map(id => brands[id]),
    };
  },
);

/**
 * Retrieves if a brands result is cached by its hash.
 *
 * @function
 *
 * @param {object} state - Application state.
 * @param {string} hash - Brands identifier for fetch brands request composed by query.
 *
 * @see {module:brands/actions.fetchBrands}
 *
 * @returns {boolean} Whether the brands result is cached or not.
 */
export const isBrandsResultCached = (state, hash = getBrandsHash(state)) =>
  !!getResult(state.brands)?.[hash];
