import { resetOrderReturnOptionsState } from './index.js';
import type { Order } from '@farfetch/blackout-client';
import type { ResetOrderReturnOptionsStateAction } from '../types/index.js';
import type { StoreState } from '../../types/index.js';
import type { ThunkDispatch } from 'redux-thunk';

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
      ResetOrderReturnOptionsStateAction
    >,
  ): void => {
    dispatch(resetOrderReturnOptionsState(orderIds));
  };

export default resetOrderReturnOptions;
