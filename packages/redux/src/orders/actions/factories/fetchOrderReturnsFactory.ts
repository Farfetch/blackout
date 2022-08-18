import * as actionTypes from '../../actionTypes';
import {
  Config,
  GetOrderReturns,
  Return,
  toBlackoutError,
} from '@farfetch/blackout-client';
import { normalize } from 'normalizr';
import returnSchema from '../../../entities/schemas/return';
import type { Dispatch } from 'redux';
import type { FetchOrderReturnsAction } from '../../types/actions.types';

/**
 * Method responsible for returns from a specific order.
 *
 * @param getOrderReturns - Get order returns client.
 *
 * @returns Thunk factory.
 */
const fetchOrderReturnsFactory =
  (getOrderReturns: GetOrderReturns) =>
  (orderId: string, config?: Config) =>
  async (dispatch: Dispatch<FetchOrderReturnsAction>): Promise<Return[]> => {
    try {
      dispatch({
        meta: { orderId },
        type: actionTypes.FETCH_ORDER_RETURNS_REQUEST,
      });

      const result = await getOrderReturns(orderId, config);

      dispatch({
        meta: { orderId },
        payload: normalize(result, [returnSchema]),
        type: actionTypes.FETCH_ORDER_RETURNS_SUCCESS,
      });
      return result;
    } catch (error) {
      dispatch({
        meta: { orderId },
        payload: { error: toBlackoutError(error) },
        type: actionTypes.FETCH_ORDER_RETURNS_FAILURE,
      });

      throw error;
    }
  };

export default fetchOrderReturnsFactory;
