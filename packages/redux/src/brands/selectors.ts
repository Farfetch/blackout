/**
 * @module brands/selectors
 * @category Brands
 * @subcategory Selectors
 */

import { createSelector } from 'reselect';
import { getBrands } from '../entities';
import { getError, getHash, getIsLoading, getResult } from './reducer';
import type { Brand, Brands } from '@farfetch/blackout-client/brands/types';
import type { Error } from '@farfetch/blackout-client/types';
import type { State } from './types';
import type { StoreState } from '../types';

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
export const getBrandsHash = (state: StoreState): State['hash'] =>
  getHash(state.brands);

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
 * @returns {object|undefined} Brand error.
 */
export const getBrandError = (
  state: StoreState,
  id: Brand['id'],
): Error | undefined => getError(state.brands)?.[id];

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
 * @returns {object|undefined} Brands error.
 */
export const getBrandsError = (
  state: StoreState,
  hash = getBrandsHash(state),
): Error | undefined => (hash ? getError(state.brands)[hash] : undefined);

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
 * @returns {boolean|undefined} Loading status corresponding to a fetchBrand request.
 */
export const isBrandLoading = (
  state: StoreState,
  id: Brand['id'],
): boolean | undefined => getIsLoading(state.brands)?.[id];

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
 * @returns {boolean|undefined} Loading status corresponding to a fetchBrands request.
 */
export const areBrandsLoading = (
  state: StoreState,
  hash = getBrandsHash(state),
): boolean | undefined =>
  hash ? getIsLoading(state.brands)?.[hash] : undefined;

/**
 * Returns the brands result provenient from the `fetchBrands` request.
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
    (state: StoreState, hash = getBrandsHash(state)) => hash,
    (state: StoreState) => getResult(state.brands),
    getBrands,
  ],
  (hash, brandsResult, brands) => {
    const result = hash && brandsResult[hash];

    if (!result) {
      return;
    }

    return {
      ...result,
      entries: result.entries.map((id: number) => brands?.[id]),
    };
  },
  // Little workaround to "explain" to typescript the function signature, to
  // avoid the "Expected 1 arguments, but got 2." error.
  // https://github.com/reduxjs/reselect/issues/459#issuecomment-804335461
) as (state: StoreState, hash?: string | null) => Brands | undefined;

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
export const isBrandsResultCached = (
  state: StoreState,
  hash = getBrandsHash(state),
): boolean => (hash ? !!getResult(state.brands)[hash] : false);
