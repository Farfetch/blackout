import * as actionTypes from '../actionTypes';
import { resetOrderReturnOptionsState } from '.';
import type { Dispatch } from 'redux';
import type { Order } from '@farfetch/blackout-client';
import type {
  ResetOrderReturnOptionsEntitiesAction,
  ResetOrderReturnOptionsStateAction,
} from '../types';
import type { StoreState } from '../../types';
import type { ThunkDispatch } from 'redux-thunk';

/**
 * Reset order return options related entities to its initial value.
 *
 * @example
 * ```
 * // Store before executing action
 * const store = {
 *  entities: {
 *    returnOptions: { 10537_CourierPickUp: {...} },
 *    orders: { ABCD2F: { byMerchant: { '10000': { returnOptions: ['10537_CourierPickUp'] } } } }
 *  }
 * }
 *
 * // Result of reset entities:
 * const store = { entities: { returnOptions: {} }, orders: { ABCD2F: { byMerchant: { '10000': {} } } } }
 * ```
 *
 * @param orderIds - Order ids whose return options entities state should be reset.
 *
 * @returns Dispatch reset order return options entities action.
 */
const resetEntities =
  (orderIds?: Array<Order['id']>) =>
  (dispatch: Dispatch<ResetOrderReturnOptionsEntitiesAction>) => {
    dispatch({
      type: actionTypes.RESET_ORDER_RETURN_OPTIONS_ENTITIES,
      payload: orderIds,
    });
  };

/**
 * Reset order return options state and related entities to its initial value.
 *
 * @example
 * ```
 * import { resetOrderReturnOptions } from '@farfetch/blackout-redux';
 *
 * // State and store before executing action
 * const state = { orders: { orderReturnOptions: { error: { ABCD2F: null }, isLoading: { ABCD2F: true }, } } };
 * const store = {
 *  entities: {
 *    returnOptions: { 10537_CourierPickUp: {...} },
 *    orders: { ABCD2F: { byMerchant: { '10000': { returnOptions: ['10537_CourierPickUp'] } } } }
 *  }
 * }
 *
 * // Result of resetOrderReturnOptions:
 * const state = { orders: { orderReturnOptions: { error: {}, isLoading: {}, } } };
 * const store = { entities: { returnOptions: {} }, orders: { ABCD2F: { byMerchant: { '10000': {} } } } }
 *
 * // Usage
 * dispatch(resetOrderReturnOptions());
 * ```
 *
 * @param orderIds - Order ids whose return options state and entities should be reset.
 *
 * @returns Dispatch reset order return options state and entities action.
 */
const resetOrderReturnOptions =
  (orderIds?: Array<Order['id']>) =>
  (
    dispatch: ThunkDispatch<
      StoreState,
      unknown,
      ResetOrderReturnOptionsStateAction | ResetOrderReturnOptionsEntitiesAction
    >,
  ): void => {
    dispatch(resetOrderReturnOptionsState(orderIds));
    dispatch(resetEntities(orderIds));
  };

export default resetOrderReturnOptions;
