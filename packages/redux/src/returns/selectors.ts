import { createSelector } from 'reselect';
import {
  getCreateReturn,
  getReturnDetails as getReturnDetailsFromReducer,
  getReturnPickupCapabilities as getReturnPickupCapabilitiesFromReducer,
} from './reducer';
import { getEntities, getEntityById } from '../entities/selectors';
import generateReturnPickupCapabilityHash from './helpers/generateReturnPickupCapabilityHash';
import type { Return, ReturnItem } from '@farfetch/blackout-client';
import type { ReturnEntityDenormalized, ReturnItemEntity } from '../entities';
import type { ReturnsState } from './types';
import type { StoreState } from '../types';

/**
 * Returns the 'returns' entities from the application state.
 *
 * @param state - Application state.
 *
 * @returns Returns entities.
 */
export const getReturnsEntities = (state: StoreState) =>
  getEntities(state, 'returns');

/**
 * Returns the 'returnItems' entities from the application state.
 *
 * @param state - Application state.
 *
 * @returns ReturnsItems entities.
 */
export const getReturnItemsEntities = (state: StoreState) =>
  getEntities(state, 'returnItems');

/**
 * Returns the return entity details denormalized from
 * the application state if found, undefined otherwise.
 *
 * @param state - Application state.
 *
 * @returns Return object.
 */
export const getReturn: (
  state: StoreState,
  returnId: Return['id'],
) => ReturnEntityDenormalized | undefined = createSelector(
  [
    (state: StoreState, returnId: Return['id']) =>
      getEntityById(state, 'returns', returnId),
    getReturnItemsEntities,
  ],
  (returnEntity, returnItems) => {
    if (!returnEntity || !returnItems) {
      return undefined;
    }

    return {
      ...returnEntity,
      items: returnEntity.items
        .map(returnItemId => returnItems[returnItemId])
        .filter(Boolean) as ReturnItemEntity[],
    };
  },
);

/**
 * Returns the 'returnItems' entity from the application state.
 *
 * @param state        - Application state.
 * @param returnItemId - Return item identifier.
 *
 * @returns Return item.
 */
export const getReturnItem = (
  state: StoreState,
  returnItemId: ReturnItem['id'],
) => getEntityById(state, 'returnItems', returnItemId);

/**
 * Returns the loading status for the returns when
 * fetching or updating.
 *
 * @param state    - Application state.
 * @param returnId - Id of the return.
 *
 * @returns Loading status of the passed in return
 * for the fetch or update operations.
 */
export const isReturnLoading = (state: StoreState, returnId: Return['id']) =>
  getReturnDetailsFromReducer(state.returns as ReturnsState).isLoading[
    returnId
  ];

/**
 * Returns the error for the fetch and update return requests.
 *
 * @param state - Application state.
 *
 * @returns Return error.
 */
export const getReturnError = (state: StoreState, returnId: Return['id']) =>
  getReturnDetailsFromReducer(state.returns as ReturnsState).error[returnId];

/**
 * Returns the fetched status for the return fetching
 * or updating operations.
 *
 * @param state    - Application state.
 * @param returnId - Id of the return.
 *
 * @returns IsFetched status of the passed in return
 * for the fetch or update operations.
 */
export const isReturnFetched = (state: StoreState, returnId: Return['id']) =>
  (!!getReturn(state, returnId) || !!getReturnError(state, returnId)) &&
  !isReturnLoading(state, returnId);

/**
 * Returns the loading status for the fetch pickup capability request.
 *
 * @param state - Application state.
 *
 * @returns Loading status.
 */
export const isReturnPickupCapabilityLoading = (
  state: StoreState,
  returnId: Return['id'],
  pickupDay: string,
) => {
  const hash = generateReturnPickupCapabilityHash(returnId, pickupDay);

  return getReturnPickupCapabilitiesFromReducer(state.returns as ReturnsState)
    .isLoading[hash];
};

/**
 * Returns the error for the fetch pickup capability request.
 *
 * @param state - Application state.
 *
 * @returns Capabilities error.
 */
export const getReturnPickupCapabilityError = (
  state: StoreState,
  returnId: Return['id'],
  pickupDay: string,
) => {
  const hash = generateReturnPickupCapabilityHash(returnId, pickupDay);

  return getReturnPickupCapabilitiesFromReducer(state.returns as ReturnsState)
    .error[hash];
};

/**
 * Returns the pickup capability for a specific return and
 * pickup day.
 *
 * @param state - Application state.
 *
 * @returns PickupCapability or undefined if not found.
 */
export const getReturnPickupCapability = (
  state: StoreState,
  returnId: Return['id'],
  pickupDay: string,
) => {
  const hash = generateReturnPickupCapabilityHash(returnId, pickupDay);

  return getEntityById(state, 'returnPickupCapabilities', hash);
};

/**
 * Returns the isFetched status for the fetch pickup capability request.
 *
 * @param state - Application state.
 *
 * @returns isFetched status.
 */
export const isReturnPickupCapabilityFetched = (
  state: StoreState,
  returnId: Return['id'],
  pickupDay: string,
) =>
  (!!getReturnPickupCapability(state, returnId, pickupDay) ||
    !!getReturnPickupCapabilityError(state, returnId, pickupDay)) &&
  !isReturnPickupCapabilityLoading(state, returnId, pickupDay);

/**
 * Returns the loading status for the create return request.
 *
 * @param state - Application state.
 *
 * @returns Loading status for the create return request.
 */
export const isCreateReturnLoading = (state: StoreState) =>
  getCreateReturn(state.returns as ReturnsState).isLoading;

/**
 * Returns the error for the create return request.
 *
 * @param state - Application state.
 *
 * @returns Create return error.
 */
export const getCreateReturnError = (state: StoreState) =>
  getCreateReturn(state.returns as ReturnsState).error;

/**
 * Returns the create return entity or undefined if not found.
 *
 * @param state - Application state.
 *
 * @returns The created return entity if found, undefined otherwise.
 */
export const getCreatedReturn = (state: StoreState) => {
  const createdReturnId = getCreateReturn(state.returns as ReturnsState).result;

  if (!createdReturnId) {
    return undefined;
  }

  return getReturn(state, createdReturnId);
};

/**
 * Returns the isFetched status for the create return request.
 *
 * @param state - Application state.
 *
 * @returns Is fetched status for the create return request.
 */
export const isCreateReturnFetched = (state: StoreState) =>
  (!!getCreatedReturn(state) || !!getCreateReturnError(state)) &&
  !isCreateReturnLoading(state);
