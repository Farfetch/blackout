import { createSelector } from 'reselect';
import {
  getEntities,
  getEntityById,
  MerchantLocationEntity,
} from '../entities';
import { getError, getIsLoading } from './reducer';
import type { MerchantLocation } from '@farfetch/blackout-client';
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

/**
 * Returns a specific merchant location by its id.
 *
 * @param state - Application state.
 * @param id    - Merchant Location id.
 *
 * @returns - Merchant location.
 */
export const getMerchantLocation = (
  state: StoreState,
  id: MerchantLocationEntity['id'],
) => getEntityById(state, 'merchantsLocations', id);

/**
 * Returns all merchants locations from state.
 *
 * @param state - Application state.
 *
 * @returns - Object with key values pairs representing merchant location id and merchant location
 * properties.
 */
export const getMerchantsLocations = (state: StoreState) =>
  getEntities(state, 'merchantsLocations');

/**
 * Returns all the merchants locations corresponding to the provided ids.
 *
 * @param state - Application state.
 * @param ids   - Merchants locations ids.
 *
 * @returns Merchants locations of the provided ids.
 */
export const getMerchantsLocationsByIds = createSelector(
  [
    state => state,
    (state: StoreState, ids: Array<MerchantLocationEntity['id']>) => ids,
  ],
  (state, ids) =>
    ids
      .map(id => getMerchantLocation(state, id))
      .filter(Boolean) as MerchantLocation[],
);
