import { createSelector } from 'reselect';
import { getEntities, getEntityById } from '../../entities/selectors/index.js';
import { type StoreState } from '../../index.js';
import buildQueryStringFromObject from '../../helpers/buildQueryStringFromObject.js';
import type {
  CheckoutOrder,
  DraftOrder,
  DraftOrdersQuery,
} from '@farfetch/blackout-client';
import type { DraftOrdersState } from './index.js';

import {
  getAllDraftOrders as getAllDraftOrdersFromReducer,
  getDraftOrderCreations,
  getDraftOrder as getDraftOrderFromReducer,
  getRemoveDraftOrder as getRemoveDraftOrderFromReducer,
  getUpdateDraftOrder as getUpdateDraftOrderFromReducer,
} from './reducer.js';

const getDraftOrdersEntities = (state: StoreState) =>
  getEntities(state, 'draftOrders');

/**
 * Returns the loading status for the create draft order request for a specific draft order.
 *
 * @param state - Application state.
 * @param orderId - Id of the checkout to get the loading status.
 *
 * @returns Boolean indicating if the request is loading or not.
 */
export const isDraftOrderCreationsLoading = (
  state: StoreState,
  orderId: CheckoutOrder['id'],
) =>
  !!getDraftOrderCreations(state.draftOrders as DraftOrdersState)[orderId]
    ?.isLoading;

/**
 * Returns the error for the create draft order request for a specific draft order.
 *
 * @param state - Application state.
 * @param orderId - Id of the checkout to get the create participation error.
 *
 * @returns Error for the create draft order participation, if any.
 */
export const getDraftOrderCreationsError = (
  state: StoreState,
  orderId: CheckoutOrder['id'],
) =>
  getDraftOrderCreations(state.draftOrders as DraftOrdersState)[orderId]?.error;

/**
 * Returns all draft orders from state that might have been loaded by different
 * fetch draft orders requests.
 *
 * @param state - Application state
 *
 * @returns All Draft Orders entities in the state.
 */
export const getDraftOrders: (state: StoreState) => DraftOrder[] =
  createSelector([getDraftOrdersEntities], draftOrder =>
    Object.values(draftOrder || {}),
  );

/**
 * Returns a specific draft order by its id.
 *
 * @param state   - Application state.
 * @param draftOrderId - Id of the draft order to get.
 *
 * @returns Draft order entity or undefined if not found.
 */
export const getDraftOrder = (
  state: StoreState,
  draftOrderId: DraftOrder['id'],
) => getEntityById(state, 'draftOrders', draftOrderId);

/**
 * Returns the loading status for a specific fetch draft orders request.
 *
 * @param state - Application state.
 * @param query - Query parameters used on the request.
 *
 * @returns Boolean indicating if the request is loading or not.
 */
export const areDraftOrdersLoading = (
  state: StoreState,
  query?: DraftOrdersQuery,
) => {
  const draftOrderHash = buildQueryStringFromObject(query || {});
  const allDraftOrders = getAllDraftOrdersFromReducer(
    state.draftOrders as DraftOrdersState,
  );

  return !!allDraftOrders[draftOrderHash]?.isLoading;
};

/**
 * Returns the error for a specific fetch draft orders request.
 *
 * @param state - Application state.
 * @param query - Query parameters used on the request.
 *
 * @returns The error for the fetch draft orders request, if any.
 */
export const getDraftOrderssError = (
  state: StoreState,
  query?: DraftOrdersQuery,
) => {
  const draftOrderHash = buildQueryStringFromObject(query || {});
  const draftOrderError = getAllDraftOrdersFromReducer(
    state.draftOrders as DraftOrdersState,
  )[draftOrderHash];

  return draftOrderError?.error;
};

/**
 * Return the loading status for the fetch request of a specific draft order.
 *
 * @param state - Application state.
 * @param draftOrderId - Id of the draftOrder to get the loading status.
 *
 * @returns Boolean indicating if the request is loading or not.
 */
export const isDraftOrderLoading = (
  state: StoreState,
  draftOrderId: DraftOrder['id'],
) =>
  !!getDraftOrderFromReducer(state.draftOrders as DraftOrdersState)[
    draftOrderId
  ]?.isLoading;

/**
 * Returns the error for the fetch request of a specific draft order.
 *
 * @param state - Application state.
 * @param draftOrderId - Id of the draftOrder to get the error.
 *
 * @returns Error for the fetch draft order request, if any.
 */
export const getDraftOrderError = (
  state: StoreState,
  draftOrderId: DraftOrder['id'],
) =>
  getDraftOrderFromReducer(state.draftOrders as DraftOrdersState)[draftOrderId]
    ?.error;

/**
 * Return the loading status for the update of a specific draft order.
 *
 * @param state - Application state.
 * @param draftOrderId - Id of the draftOrder to get the loading status.
 *
 * @returns Boolean indicating if the request is loading or not.
 */
export const isUpdateDraftOrderLoading = (
  state: StoreState,
  draftOrderId: DraftOrder['id'],
) =>
  !!getUpdateDraftOrderFromReducer(state.draftOrders as DraftOrdersState)[
    draftOrderId
  ]?.isLoading;

/**
 * Returns the error for the update of a specific draft order.
 *
 * @param state - Application state.
 * @param draftOrderId - Id of the draftOrder to get the error.
 *
 * @returns Error for the fetch draft order request, if any.
 */
export const getUpdateDraftOrderError = (
  state: StoreState,
  draftOrderId: DraftOrder['id'],
) =>
  getUpdateDraftOrderFromReducer(state.draftOrders as DraftOrdersState)[
    draftOrderId
  ]?.error;

/**
 * Return the loading status for the delete of a specific draft order.
 *
 * @param state - Application state.
 * @param draftOrderId - Id of the draftOrder to get the loading status.
 *
 * @returns Boolean indicating if the request is loading or not.
 */
export const isRemoveDraftOrderLoading = (
  state: StoreState,
  draftOrderId: DraftOrder['id'],
) =>
  !!getRemoveDraftOrderFromReducer(state.draftOrders as DraftOrdersState)[
    draftOrderId
  ]?.isLoading;

/**
 * Returns the error for the delete of a specific draft order.
 *
 * @param state - Application state.
 * @param draftOrderId - Id of the draftOrder to get the error.
 *
 * @returns Error for the fetch draft order request, if any.
 */
export const getRemoveDraftOrderError = (
  state: StoreState,
  draftOrderId: DraftOrder['id'],
) =>
  getRemoveDraftOrderFromReducer(state.draftOrders as DraftOrdersState)[
    draftOrderId
  ]?.error;
