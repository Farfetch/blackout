import * as actionTypes from '../../actionTypes';
import { normalize } from 'normalizr';
import { toError } from '@farfetch/blackout-client/helpers/client';
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
    try {
      dispatch({
        type: actionTypes.FETCH_RETURNS_FROM_ORDER_REQUEST,
      });

      const result = await getReturnsFromOrder(orderId, query, config);

      dispatch({
        payload: normalize(result, [returnSchema]),
        type: actionTypes.FETCH_RETURNS_FROM_ORDER_SUCCESS,
      });
      return result;
    } catch (error) {
      dispatch({
        payload: { error: toError(error) },
        type: actionTypes.FETCH_RETURNS_FROM_ORDER_FAILURE,
      });

      throw error;
    }
  };

export default fetchReturnsFromOrderFactory;
