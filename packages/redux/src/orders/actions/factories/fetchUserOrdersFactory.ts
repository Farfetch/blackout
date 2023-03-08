import * as actionTypes from '../../actionTypes.js';
import {
  type Config,
  type GetUserOrders,
  type GetUserOrdersQuery,
  type Orders,
  toBlackoutError,
} from '@farfetch/blackout-client';
import normalizeFetchOrdersResponse from './helpers/normalizeFetchOrdersResponse.js';
import type { Dispatch } from 'redux';
import type { FetchOrdersAction } from '../../types/actions.types.js';

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
      const errorAsBlackoutError = toBlackoutError(error);

      dispatch({
        payload: { error: errorAsBlackoutError },
        type: actionTypes.FETCH_USER_ORDERS_FAILURE,
      });

      throw errorAsBlackoutError;
    }
  };

export default fetchUserOrdersFactory;
