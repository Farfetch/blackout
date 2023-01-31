/**
 * @module returns/selectors
 * @category Returns
 * @subcategory Selectors
 */

import { createSelector } from 'reselect';
import {
  getEntity,
  getReturnItems as getEntityReturnItems,
  getReturns as getEntityReturns,
} from '../../entities/redux/selectors';
import {
  getError,
  getId,
  getIsLoading,
  getPickupCapabilities,
  getPickupRescheduleRequests,
  getReferences,
  getReturns,
} from './reducer';
import get from 'lodash/get';

/**
 * Returns a specific return identified by its id.
 *
 * @function
 *
 * @param {object} state - Application state.
 *
 * @returns {number} Return id.
 */
export const getReturnId = state => getId(state.returns);

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
export const getReturnError = state => getError(state.returns);

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
export const getReturnItem = (state, returnItemId) =>
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
    returnItemsIds?.map(returnItemId => returnsItemsObject[returnItemId]),
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
export const isReturnLoading = state => getIsLoading(state.returns);

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
export const isReturnsLoading = state => getReturns(state.returns).isLoading;

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
export const getReturnsError = state => getReturns(state.returns).error;

/**
 * Returns the loading status for the get capabilities request.
 *
 * @function
 *
 * @param {object} state - Application state.
 *
 * @returns {boolean} Loading status.
 */
export const isPickupCapabilitiesLoading = state =>
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
export const getPickupCapabilitiesError = state =>
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
export const isReferencesLoading = state =>
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
export const getReferencesError = state => getReferences(state.returns).error;

/**
 * Returns the loading status for the get reschedule request.
 *
 * @function
 *
 * @param {object} state - Application state.
 *
 * @returns {boolean} Loading status.
 */
export const isPickupRescheduleRequestsLoading = state =>
  getPickupRescheduleRequests(state.returns).isLoading;

/**
 * Returns the error for the get reschedule request.
 *
 * @function
 *
 * @param {object} state - Application state.
 *
 * @returns {object} Pikcup Reschedule error.
 */
export const getPickupRescheduleRequestsError = state =>
  getPickupRescheduleRequests(state.returns).error;
