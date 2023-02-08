import * as actionTypes from '../../actionTypes.js';
import {
  type Brand,
  type Config,
  type GetOrder,
  type Order,
  toBlackoutError,
} from '@farfetch/blackout-client';
import { normalize } from 'normalizr';
import orderSchema from '../../../entities/schemas/order.js';
import type {
  CategoryEntity,
  OrderEntity,
  OrderItemEntity,
} from '../../../entities/index.js';
import type { Dispatch } from 'redux';
import type { FetchOrderAction } from '../../types/actions.types.js';
import type { GetOptionsArgument, StoreState } from '../../../types/index.js';

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

      const normalizedResult = normalize<
        OrderEntity,
        {
          orders: Record<OrderEntity['id'], OrderEntity>;
          orderItems: Record<OrderItemEntity['id'], OrderItemEntity>;
          brands: Record<Brand['id'], Brand>;
          categories: Record<CategoryEntity['id'], CategoryEntity>;
        },
        OrderEntity['id']
      >(
        {
          // Send productImgQueryParam so order items entity can use it in `adaptProductImages`
          productImgQueryParam,
          ...result,
        },
        orderSchema,
      );

      const normalizedOrder = normalizedResult.entities.orders?.[orderId];

      if (normalizedOrder) {
        delete (normalizedOrder as Record<string, unknown>)
          .productImgQueryParam;
      }

      dispatch({
        meta: { orderId },
        payload: normalizedResult,
        type: actionTypes.FETCH_ORDER_SUCCESS,
      });

      return result;
    } catch (error) {
      const errorAsBlackoutError = toBlackoutError(error);

      dispatch({
        meta: { orderId },
        payload: { error: errorAsBlackoutError },
        type: actionTypes.FETCH_ORDER_FAILURE,
      });

      throw errorAsBlackoutError;
    }
  };

export default fetchOrderFactory;
