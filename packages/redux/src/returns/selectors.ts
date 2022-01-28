/**
 * @module returns/selectors
 * @category Returns
 * @subcategory Selectors
 */

import { createSelector } from 'reselect';
import { getEntity } from '@farfetch/blackout-client/entities/redux/selectors';
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
import type { StoreState } from '../types';

/**
 * Returns a specific return identified by its id.
 *
 * @function
 *
 * @param {object} state - Application state.
 *
 * @returns {number} Return id.
 */
export const getReturnId = (state: StoreState) => getId(state.returns);

/**
 * Returns the 'returns' entity details in the application state.
 *
 * @function
 *
 * @param {object} state - Application state.
 *
 * @returns {object} Return object.
 */
export const getReturn = createSelector(
  [getEntityReturns, getReturnId],
  (entityReturns, returnId) =>
    entityReturns && returnId ? entityReturns[returnId] : undefined,
);

/**
 * Returns the error for the 'returns' area actions.
 *
 * @function
 *
 * @param {object} state - Application state.
 *
 * @returns {object} Return error.
 */
export const getReturnError = (state: StoreState) => getError(state.returns);

/**
 * Returns the 'returnItems' entity in the application state.
 *
 * @function
 *
 * @param {object} state - Application state.
 * @param {string} returnItemId - Return item identifier.
 *
 * @returns {object} Return item.
 */
export const getReturnItem = (state: StoreState, returnItemId: string) =>
  getEntity(state, 'returnItems', returnItemId);

/**
 * Returns all the return items ids.
 *
 * @function
 *
 * @param {object} state - Application state.
 *
 * @returns {Array|undefined} List of return items ids.
 */
export const getReturnItemsIds = createSelector([getReturn], returnObject =>
  get(returnObject, 'items'),
);

/**
 * Returns all the return items.
 *
 * @function
 *
 * @param {object} state - Application state.
 *
 * @returns {Array|undefined} List of return items.
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
 * @function
 *
 * @param {object} state - Application state.
 *
 * @returns {boolean} Loading status.
 */
export const isReturnLoading = (state: StoreState) =>
  getIsLoading(state.returns);

/**
 * Returns the loading status for the returns requests.
 * This handles the get, create and update return requests.
 *
 * @function
 *
 * @param {object} state - Application state.
 *
 * @returns {boolean} Loading status.
 */
export const isReturnsLoading = (state: StoreState) =>
  getReturns(state.returns).isLoading;

/**
 * Returns the error for the returns requests.
 * This handles the get, create and update return requests.
 *
 * @function
 *
 * @param {object} state - Application state.
 *
 * @returns {object} Return error.
 */
export const getReturnsError = (state: StoreState) =>
  getReturns(state.returns).error;

/**
 * Returns the loading status for the get capabilities request.
 *
 * @function
 *
 * @param {object} state - Application state.
 *
 * @returns {boolean} Loading status.
 */
export const isPickupCapabilitiesLoading = (state: StoreState) =>
  getPickupCapabilities(state.returns).isLoading;

/**
 * Returns the error for the get capabilities request.
 *
 * @function
 *
 * @param {object} state - Application state.
 *
 * @returns {object} Capabilities error.
 */
export const getPickupCapabilitiesError = (state: StoreState) =>
  getPickupCapabilities(state.returns).error;

/**
 * Returns the loading status for the get references request.
 *
 * @function
 *
 * @param {object} state - Application state.
 *
 * @returns {boolean} Loading status.
 */
export const isReferencesLoading = (state: StoreState) =>
  getReferences(state.returns).isLoading;

/**
 * Returns the error for the get references request.
 *
 * @function
 *
 * @param {object} state - Application state.
 *
 * @returns {object} References error.
 */
export const getReferencesError = (state: StoreState) =>
  getReferences(state.returns).error;
