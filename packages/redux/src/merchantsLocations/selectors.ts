/**
 * @module merchantsLocations/selectors
 * @category Merchants locations
 * @subcategory Selectors
 */
import { getError, getIsLoading } from './reducer';
import type { Error } from '@farfetch/blackout-client/types';
import type { StoreState } from '../types';

/**
 * Returns the loading merchants locations status.
 *
 * @function
 *
 * @param {object} state - Application state.
 *
 * @returns {boolean} If merchants locations are loading or not.
 */
export const areMerchantsLocationsLoading = (
  state: StoreState,
): boolean | undefined => getIsLoading(state.merchantsLocations);

/**
 * Returns the error of the merchants locations.
 *
 * @function
 *
 * @param {object} state - Application state.
 *
 * @returns {object} The merchants locations error.
 */
export const getMerchantsLocationsError = (state: StoreState): Error | null =>
  getError(state.merchantsLocations);
