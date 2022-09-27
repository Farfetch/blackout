import * as actionTypes from '../actionTypes';
import { resetOrderReturnsState } from '.';
import type { Dispatch } from 'redux';
import type { Order } from '@farfetch/blackout-client';
import type {
  ResetOrderReturnsEntitiesAction,
  ResetOrderReturnsStateAction,
} from '../types';
import type { StoreState } from '../../types';
import type { ThunkDispatch } from 'redux-thunk';

/**
 * Reset order returns related entities to its initial value.
 *
 * @example
 * ```
 * // Store before executing action
 * const store = {
 *  entities: {
 *    returns: { 2000: {...} },
 *    orders: { ABCD2F: { byMerchant: { '10000': { returns: [2000] } } } }
 *  }
 * }
 *
 * // Result of reset entities:
 * const store = { entities: { returns: {} }, orders: { ABCD2F: { byMerchant: { '10000': {} } } } }
 * ```
 * @param orderIds - Order ids whose returns entities state should be reset.
 *
 * @returns Dispatch reset order returns entities action.
 */
const resetEntities =
  (orderIds?: Array<Order['id']>) =>
  (dispatch: Dispatch<ResetOrderReturnsEntitiesAction>) => {
    dispatch({
      type: actionTypes.RESET_ORDER_RETURNS_ENTITIES,
      payload: orderIds,
    });
  };

/**
 * Reset order returns state and related entities to its initial value.
 *
 * @example
 * ```
 * import { resetOrderReturns } from '@farfetch/blackout-redux';
 *
 * // State and store before executing action
 * const state = { orders: { orderReturns: { error: { ABCD2F: null }, isLoading: { ABCD2F: true }, } } };
 * const store = {
 *  entities: {
 *    returns: { 2000: {...} },
 *    orders: { ABCD2F: { byMerchant: { '10000': { returns: [2000] } } } }
 *  }
 * }
 *
 * // Result of resetOrderReturns:
 * const state = { orders: { orderReturns: { error: {}, isLoading: {}, } } };
 * const store = { entities: { returns: {} }, orders: { ABCD2F: { byMerchant: { '10000': {} } } } }
 *
 * // Usage
 * dispatch(resetOrderReturns());
 * ```
 * @param orderIds - Order ids whose returns state and entities should be reset.
 *
 * @returns Dispatch reset order returns state and entities action.
 */
const resetOrderReturns =
  (orderIds?: Array<Order['id']>) =>
  (
    dispatch: ThunkDispatch<
      StoreState,
      unknown,
      ResetOrderReturnsStateAction | ResetOrderReturnsEntitiesAction
    >,
  ): void => {
    dispatch(resetOrderReturnsState(orderIds));
    dispatch(resetEntities(orderIds));
  };

export default resetOrderReturns;
