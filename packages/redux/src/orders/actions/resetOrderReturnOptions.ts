import * as actionTypes from '../actionTypes.js';
import type { Dispatch } from 'redux';
import type { Order } from '@farfetch/blackout-client';
import type {
  ResetOrderReturnOptionsEntitiesAction,
  ResetOrderReturnOptionsStateAction,
} from '../types/index.js';
import type { StoreState } from '../../types/index.js';
import type { ThunkDispatch } from 'redux-thunk';

/**
 * Reset order return options related entities to its initial value.
 *
 * @example
 * ```
 * // Store before executing action
 * const store = {
 *  entities: {
 *    returnOptions: { 100001339: { merchantOrderId: 100001339, orderId: ABCD2F...} },
 *  }
 * }
 *
 * // Result of reset entities:
 * const store = { entities: { returnOptions: {} } }
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
 * Reset orders return options slice state only
 * to its initial value.
 *
 * @param orderIds - Order ids whose return options state should be reset.
 *
 * @returns - Thunk.
 */
const resetOrderReturnOptionsState =
  (orderIds?: Array<Order['id']>) => (dispatch: Dispatch) => {
    dispatch({
      type: actionTypes.RESET_ORDER_RETURN_OPTIONS_STATE,
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
 * const state = { orders: { orderReturnOptions: { error: { ABCD2F: null }, isLoading: { ABCD2F: true }, result: { ABCD2F : [151073263, 151073264]} } } };
 * const store = {
 *  entities: {
 *    returnOptions: { 151073263: {...}, 151073264: {...} },
 *  }
 * }
 *
 * // Result of resetOrderReturnOptions:
 * const state = { orders: { orderReturnOptions: { error: {}, isLoading: {}, result: {} } } };
 * const store = { entities: { returnOptions: {} } }
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
