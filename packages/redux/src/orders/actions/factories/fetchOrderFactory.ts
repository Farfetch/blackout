import * as actionTypes from '../../actionTypes';
import {
  Config,
  GetOrder,
  Order,
  toBlackoutError,
} from '@farfetch/blackout-client';
import normalizeFetchOrderResponse from './helpers/normalizeFetchOrderResponse';
import type { Dispatch } from 'redux';
import type { FetchOrderAction } from '../../types/actions.types';
import type { GetOptionsArgument, StoreState } from '../../../types';

/**
 * Fetches order details.
 *
 * @param getOrder - Get order details client.
 *
 * @returns Thunk factory.
 */
const fetchOrderFactory =
  (getOrder: GetOrder) =>
  (orderId: string, config?: Config) =>
  async (
    dispatch: Dispatch<FetchOrderAction>,
    getState: () => StoreState,
    {
      getOptions = arg => ({ productImgQueryParam: arg.productImgQueryParam }),
    }: GetOptionsArgument,
  ): Promise<Order> => {
    try {
      dispatch({
        meta: { orderId },
        type: actionTypes.FETCH_ORDER_REQUEST,
      });

      const { productImgQueryParam } = getOptions(getState);
      const result = await getOrder(orderId, config);
      const normalizedResult = normalizeFetchOrderResponse(
        result,
        productImgQueryParam,
      );

      dispatch({
        meta: { orderId },
        payload: normalizedResult,
        type: actionTypes.FETCH_ORDER_SUCCESS,
      });

      return result;
    } catch (error) {
      dispatch({
        meta: { orderId },
        payload: { error: toBlackoutError(error) },
        type: actionTypes.FETCH_ORDER_FAILURE,
      });

      throw error;
    }
  };

export default fetchOrderFactory;
