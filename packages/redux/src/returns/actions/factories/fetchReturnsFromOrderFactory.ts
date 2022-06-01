import {
  FETCH_RETURNS_FROM_ORDER_FAILURE,
  FETCH_RETURNS_FROM_ORDER_REQUEST,
  FETCH_RETURNS_FROM_ORDER_SUCCESS,
} from '../../actionTypes';
import { normalize } from 'normalizr';
import returnSchema from '../../../entities/schemas/return';
import type { Dispatch } from 'redux';
import type {
  GetReturnsFromOrder,
  Query,
  Return,
} from '@farfetch/blackout-client/src/returns/types';

/**
 * @param orderId - Order identifier.
 * @param query   - Query parameters.
 * @param config  - Custom configurations to send to the client instance (axios).
 *
 * @returns Thunk to be dispatched to the redux store.
 */

/**
 * Method responsible for returns from a specific order.
 *
 * @param getReturnsFromOrder - Get returns from order client.
 *
 * @returns Thunk factory.
 */
const fetchReturnsFromOrderFactory =
  (getReturnsFromOrder: GetReturnsFromOrder) =>
  (orderId: string, query?: Query, config?: Record<string, unknown>) =>
  async (dispatch: Dispatch): Promise<Return> => {
    dispatch({
      type: FETCH_RETURNS_FROM_ORDER_REQUEST,
    });

    try {
      const result = await getReturnsFromOrder(orderId, query, config);

      dispatch({
        payload: normalize(result, [returnSchema]),
        type: FETCH_RETURNS_FROM_ORDER_SUCCESS,
      });
      return result;
    } catch (error) {
      dispatch({
        payload: { error },
        type: FETCH_RETURNS_FROM_ORDER_FAILURE,
      });

      throw error;
    }
  };

export default fetchReturnsFromOrderFactory;
