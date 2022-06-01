import { createSelector } from 'reselect';
import { getEntityById } from '../entities/selectors';
import {
  getReturnItems as getEntityReturnItems,
  getReturns as getEntityReturns,
} from '@farfetch/blackout-redux/entities/selectors';
import {
  getError,
  getId,
  getIsLoading,
  getPickupCapabilities,
  getReferences,
  getReturns,
} from './reducer';
import get from 'lodash/get';
import type { ReturnItem } from '@farfetch/blackout-client/returns/types';
import type { StoreState } from '../types';

/**
 * Returns a specific return identified by its id.
 *
 * @param state - Application state.
 *
 * @returns Return id.
 */
export const getReturnId = (state: StoreState) => getId(state.returns);

/**
 * Returns the 'returns' entity details in the application state.
 *
 * @param state - Application state.
 *
 * @returns Return object.
 */
export const getReturn = createSelector(
  [getEntityReturns, getReturnId],
  (entityReturns, returnId) =>
    entityReturns && returnId ? entityReturns[returnId] : undefined,
);

/**
 * Returns the error for the 'returns' area actions.
 *
 * @param state - Application state.
 *
 * @returns Return error.
 */
export const getReturnError = (state: StoreState) => getError(state.returns);

/**
 * Returns the 'returnItems' entity in the application state.
 *
 * @param state        - Application state.
 * @param returnItemId - Return item identifier.
 *
 * @returns Return item.
 */
export const getReturnItem = (
  state: StoreState,
  returnItemId: string,
): ReturnItem | undefined => getEntityById(state, 'returnItems', returnItemId);

/**
 * Returns all the return items ids.
 *
 * @param state - Application state.
 *
 * @returns List of return items ids.
 */
export const getReturnItemsIds = createSelector([getReturn], returnObject =>
  get(returnObject, 'items'),
);

/**
 * Returns all the return items.
 *
 * @param state - Application state.
 *
 * @returns List of return items.
 */
export const getReturnItems = createSelector(
  [getEntityReturnItems, getReturnItemsIds],
  (returnsItemsObject, returnItemsIds) =>
    returnItemsIds?.map(
      (returnItemId: string) => returnsItemsObject[returnItemId],
    ),
);

/**
 * Returns the loading status for the returns.
 *
 * @param state - Application state.
 *
 * @returns Loading status.
 */
export const isReturnLoading = (state: StoreState) =>
  getIsLoading(state.returns);

/**
 * Returns the loading status for the returns requests. This handles the get,
 * create and update return requests.
 *
 * @param state - Application state.
 *
 * @returns Loading status.
 */
export const isReturnsLoading = (state: StoreState) =>
  getReturns(state.returns).isLoading;

/**
 * Returns the error for the returns requests. This handles the get, create and
 * update return requests.
 *
 * @param state - Application state.
 *
 * @returns Return error.
 */
export const getReturnsError = (state: StoreState) =>
  getReturns(state.returns).error;

/**
 * Returns the loading status for the get capabilities request.
 *
 * @param state - Application state.
 *
 * @returns Loading status.
 */
export const isPickupCapabilitiesLoading = (state: StoreState) =>
  getPickupCapabilities(state.returns).isLoading;

/**
 * Returns the error for the get capabilities request.
 *
 * @param state - Application state.
 *
 * @returns Capabilities error.
 */
export const getPickupCapabilitiesError = (state: StoreState) =>
  getPickupCapabilities(state.returns).error;

/**
 * Returns the loading status for the get references request.
 *
 * @param state - Application state.
 *
 * @returns Loading status.
 */
export const isReferencesLoading = (state: StoreState) =>
  getReferences(state.returns).isLoading;

/**
 * Returns the error for the get references request.
 *
 * @param state - Application state.
 *
 * @returns References error.
 */
export const getReferencesError = (state: StoreState) =>
  getReferences(state.returns).error;
