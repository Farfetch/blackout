import * as actionTypes from '../../actionTypes';
import {
  Config,
  GetOrders,
  GetOrdersQuery,
  OrderSummary,
  toBlackoutError,
} from '@farfetch/blackout-client';
import { normalize } from 'normalizr';
import order from '../../../entities/schemas/order';
import type { Dispatch } from 'redux';

/**
 * @param userId - Identifier of the user.
 * @param query  - Pagination information. Possible values: "page", "pageSize".
 * @param config - Custom configurations to send to the client instance (axios).
 *
 * @returns Thunk to be dispatched to the redux store.
 */

/**
 * Fetches orders.
 *
 * @param getOrders - Get orders client.
 *
 * @returns Thunk factory.
 */
const fetchOrdersFactory =
  (getOrders: GetOrders) =>
  (userId: number, query?: GetOrdersQuery, config?: Config) =>
  async (dispatch: Dispatch): Promise<OrderSummary> => {
    try {
      dispatch({
        type: actionTypes.FETCH_ORDERS_REQUEST,
      });

      const result = await getOrders(userId, query, config);
      const normalizedOrders = normalize(result, {
        entries: [order],
      });

      dispatch({
        payload: normalizedOrders,
        type: actionTypes.FETCH_ORDERS_SUCCESS,
      });

      return result;
    } catch (error) {
      dispatch({
        payload: { error: toBlackoutError(error) },
        type: actionTypes.FETCH_ORDERS_FAILURE,
      });

      throw error;
    }
  };

export default fetchOrdersFactory;
