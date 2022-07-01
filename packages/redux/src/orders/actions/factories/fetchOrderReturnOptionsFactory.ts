import * as actionTypes from '../../actionTypes';
import {
  Config,
  GetOrderReturnOptions,
  OrderReturn,
  toBlackoutError,
} from '@farfetch/blackout-client';
import { normalize } from 'normalizr';
import returnOption from '../../../entities/schemas/returnOption';
import type { Dispatch } from 'redux';

/**
 * @param orderId - The order id to get details from.
 * @param config  - Custom configurations to send to the client instance (axios).
 *
 * @returns Thunk to be dispatched to the redux store.
 */

/**
 * Fetches order return options.
 *
 * @param getOrderReturnOptions - Get order return options client.
 *
 * @returns Thunk factory.
 */
const fetchOrderReturnOptions =
  (getOrderReturnOptions: GetOrderReturnOptions) =>
  (orderId: string, config?: Config) =>
  async (dispatch: Dispatch): Promise<OrderReturn[]> => {
    try {
      dispatch({
        meta: { orderId },
        type: actionTypes.FETCH_ORDER_RETURN_OPTIONS_REQUEST,
      });

      const result = await getOrderReturnOptions(orderId, config);

      dispatch({
        meta: { orderId },
        payload: normalize(result, [{ options: [returnOption] }]),
        type: actionTypes.FETCH_ORDER_RETURN_OPTIONS_SUCCESS,
      });

      return result;
    } catch (error) {
      dispatch({
        meta: { orderId },
        payload: { error: toBlackoutError(error) },
        type: actionTypes.FETCH_ORDER_RETURN_OPTIONS_FAILURE,
      });

      throw error;
    }
  };

export default fetchOrderReturnOptions;
