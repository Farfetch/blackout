import * as actionTypes from '../../actionTypes';
import {
  Config,
  GetOrderReturnOptions,
  MerchantOrderReturnOptions,
  Order,
  toBlackoutError,
} from '@farfetch/blackout-client';
import { normalize } from 'normalizr';
import returnOption from '../../../entities/schemas/returnOption';
import type { Dispatch } from 'redux';
import type { FetchOrderReturnOptionsAction } from '../../types';
import type { ReturnOptionEntity } from '../../../entities';

/**
 * Fetches order return options.
 *
 * @param getOrderReturnOptions - Get order return options client.
 *
 * @returns Thunk factory.
 */
const fetchOrderReturnOptionsFactory =
  (getOrderReturnOptions: GetOrderReturnOptions) =>
  (orderId: Order['id'], config?: Config) =>
  async (
    dispatch: Dispatch<FetchOrderReturnOptionsAction>,
  ): Promise<MerchantOrderReturnOptions[]> => {
    try {
      dispatch({
        meta: { orderId },
        type: actionTypes.FETCH_ORDER_RETURN_OPTIONS_REQUEST,
      });

      const result = await getOrderReturnOptions(orderId, config);
      const normalizedResult = normalize<
        ReturnOptionEntity,
        {
          returnOptions: Record<
            ReturnOptionEntity['merchantOrderId'],
            ReturnOptionEntity
          >;
        },
        Array<ReturnOptionEntity['merchantOrderId']>
      >(result, [returnOption]);

      dispatch({
        meta: { orderId },
        payload: normalizedResult,
        type: actionTypes.FETCH_ORDER_RETURN_OPTIONS_SUCCESS,
      });

      return result;
    } catch (error) {
      const errorAsBlackoutError = toBlackoutError(error);

      dispatch({
        meta: { orderId },
        payload: { error: errorAsBlackoutError },
        type: actionTypes.FETCH_ORDER_RETURN_OPTIONS_FAILURE,
      });

      throw errorAsBlackoutError;
    }
  };

export default fetchOrderReturnOptionsFactory;
