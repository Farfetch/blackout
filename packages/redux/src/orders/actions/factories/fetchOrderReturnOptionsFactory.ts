import * as actionTypes from '../../actionTypes.js';
import {
  type Config,
  type GetOrderReturnOptions,
  type MerchantOrderReturnOptions,
  type Order,
  toBlackoutError,
} from '@farfetch/blackout-client';
import { normalize } from 'normalizr';
import returnOption from '../../../entities/schemas/returnOption.js';
import type { Dispatch } from 'redux';
import type { FetchOrderReturnOptionsAction } from '../../types/index.js';
import type { ReturnOptionEntity } from '../../../entities/index.js';

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
      const resultWithAppendedOrderId = result.map(returnOption => ({
        ...returnOption,
        orderId,
      }));
      const normalizedResult = normalize<
        ReturnOptionEntity,
        {
          returnOptions: Record<
            ReturnOptionEntity['merchantOrderId'],
            ReturnOptionEntity
          >;
        },
        Array<ReturnOptionEntity['merchantOrderId']>
      >(resultWithAppendedOrderId, [returnOption]);

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
