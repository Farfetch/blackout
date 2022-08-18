import * as actionTypes from '../../actionTypes';
import {
  Config,
  GetUserOrders,
  GetUserOrdersQuery,
  Orders,
  toBlackoutError,
} from '@farfetch/blackout-client';
import normalizeFetchOrdersResponse from './helpers/normalizeFetchOrdersResponse';
import type { Dispatch } from 'redux';
import type { FetchOrdersAction } from '../../types/actions.types';

/**
 * Fetches orders.
 *
 * @param getUserOrders - Get user orders client.
 *
 * @returns Thunk factory.
 */
const fetchUserOrdersFactory =
  (getUserOrders: GetUserOrders) =>
  (userId: number, query?: GetUserOrdersQuery, config?: Config) =>
  async (dispatch: Dispatch<FetchOrdersAction>): Promise<Orders> => {
    try {
      dispatch({
        type: actionTypes.FETCH_USER_ORDERS_REQUEST,
      });

      const result = await getUserOrders(userId, query, config);
      const normalizedResult = normalizeFetchOrdersResponse(result);

      dispatch({
        payload: normalizedResult,
        type: actionTypes.FETCH_USER_ORDERS_SUCCESS,
      });

      return result;
    } catch (error) {
      dispatch({
        payload: { error: toBlackoutError(error) },
        type: actionTypes.FETCH_USER_ORDERS_FAILURE,
      });

      throw error;
    }
  };

export default fetchUserOrdersFactory;
