import * as actionTypes from '../../actionTypes';
import { normalize } from 'normalizr';
import { toError } from '@farfetch/blackout-client/helpers/client';
import returnOption from '../../../entities/schemas/returnOption';
import type { Config } from '@farfetch/blackout-client/types';
import type { Dispatch } from 'redux';
import type {
  GetOrderReturnOptions,
  OrderReturn,
} from '@farfetch/blackout-client/orders/types';

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
        payload: { error: toError(error) },
        type: actionTypes.FETCH_ORDER_RETURN_OPTIONS_FAILURE,
      });

      throw error;
    }
  };

export default fetchOrderReturnOptions;
