import { getError, getIsLoading } from './reducer';
import type { MerchantsLocationsState } from './types';
import type { StoreState } from '../types';

/**
 * Returns the loading merchants locations status.
 *
 * @param state - Application state.
 *
 * @returns If merchants locations are loading or not.
 */
export const areMerchantsLocationsLoading = (state: StoreState) =>
  getIsLoading(state.merchantsLocations as MerchantsLocationsState);

/**
 * Returns the error of the merchants locations.
 *
 * @param state - Application state.
 *
 * @returns The merchants locations error.
 */
export const getMerchantsLocationsError = (state: StoreState) =>
  getError(state.merchantsLocations as MerchantsLocationsState);
