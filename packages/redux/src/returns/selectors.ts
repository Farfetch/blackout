import { createSelector } from 'reselect';
import { getEntities, getEntityById } from '../entities/selectors';
import {
  getError,
  getId,
  getIsLoading,
  getPickupCapabilities,
  getReturns,
} from './reducer';
import get from 'lodash/get';
import type { ReturnItem } from '@farfetch/blackout-client';
import type { ReturnsState } from './types';
import type { StoreState } from '../types';

/**
 * Returns the 'returns' entity from the application state.
 *
 * @param state - Application state.
 *
 * @returns Returns entity.
 */
export const getReturnsEntity = (state: StoreState) =>
  getEntities(state, 'returns');

/**
 * Returns the 'returnItems' entity from the application state.
 *
 * @param state - Application state.
 *
 * @returns ReturnsItems entity.
 */
export const getReturnItemsEntity = (state: StoreState) =>
  getEntities(state, 'returnItems');

/**
 * Returns the 'availableTimeSlots' entity from the application state.
 *
 * @param state - Application state.
 *
 * @returns AvailableTimeSlots entity.
 */
export const getTimeSlots = (state: StoreState) =>
  getEntities(state, 'availableTimeSlots');

/**
 * Returns a specific return identified by its id.
 *
 * @param state - Application state.
 *
 * @returns Return id.
 */
export const getReturnId = (state: StoreState) =>
  getId(state.returns as ReturnsState);

/**
 * Returns the 'returns' entity details in the application state.
 *
 * @param state - Application state.
 *
 * @returns Return object.
 */
export const getReturn = createSelector(
  [getReturnsEntity, getReturnId],
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
export const getReturnError = (state: StoreState) =>
  getError(state.returns as ReturnsState);

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
  returnItemId: ReturnItem['id'],
) => getEntityById(state, 'returnItems', returnItemId);

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
  [getReturnItemsEntity, getReturnItemsIds],
  (returnsItemsObject, returnItemsIds) =>
    returnItemsIds
      ?.map(returnItemId => returnsItemsObject?.[returnItemId])
      .filter(Boolean) as ReturnItem[] | undefined,
);

/**
 * Returns the loading status for the returns.
 *
 * @param state - Application state.
 *
 * @returns Loading status.
 */
export const isReturnLoading = (state: StoreState) =>
  getIsLoading(state.returns as ReturnsState);

/**
 * Returns the loading status for the returns requests. This handles the get,
 * create and update return requests.
 *
 * @param state - Application state.
 *
 * @returns Loading status.
 */
export const areReturnsLoading = (state: StoreState) =>
  getReturns(state.returns as ReturnsState).isLoading;

/**
 * Returns the error for the returns requests. This handles the get, create and
 * update return requests.
 *
 * @param state - Application state.
 *
 * @returns Return error.
 */
export const getReturnsError = (state: StoreState) =>
  getReturns(state.returns as ReturnsState).error;

/**
 * Returns the loading status for the get capabilities request.
 *
 * @param state - Application state.
 *
 * @returns Loading status.
 */
export const areReturnPickupCapabilitiesLoading = (state: StoreState) =>
  getPickupCapabilities(state.returns as ReturnsState).isLoading;

/**
 * Returns the error for the get capabilities request.
 *
 * @param state - Application state.
 *
 * @returns Capabilities error.
 */
export const getReturnPickupCapabilitiesError = (state: StoreState) =>
  getPickupCapabilities(state.returns as ReturnsState).error;
