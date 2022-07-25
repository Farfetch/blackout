import * as actionTypes from '../../actionTypes';
import {
  Config,
  GetReturnsFromOrder,
  Return,
  toBlackoutError,
} from '@farfetch/blackout-client';
import { normalize } from 'normalizr';
import returnSchema from '../../../entities/schemas/return';
import type { Dispatch } from 'redux';

/**
 * Method responsible for returns from a specific order.
 *
 * @param getReturnsFromOrder - Get returns from order client.
 *
 * @returns Thunk factory.
 */
const fetchReturnsFromOrderFactory =
  (getReturnsFromOrder: GetReturnsFromOrder) =>
  (orderId: string, config?: Config) =>
  async (dispatch: Dispatch): Promise<Return> => {
    try {
      dispatch({
        type: actionTypes.FETCH_RETURNS_FROM_ORDER_REQUEST,
      });

      const result = await getReturnsFromOrder(orderId, config);

      dispatch({
        payload: normalize(result, [returnSchema]),
        type: actionTypes.FETCH_RETURNS_FROM_ORDER_SUCCESS,
      });
      return result;
    } catch (error) {
      dispatch({
        payload: { error: toBlackoutError(error) },
        type: actionTypes.FETCH_RETURNS_FROM_ORDER_FAILURE,
      });

      throw error;
    }
  };

export default fetchReturnsFromOrderFactory;
