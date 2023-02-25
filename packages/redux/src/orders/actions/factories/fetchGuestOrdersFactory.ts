import * as actionTypes from '../../actionTypes';
import {
  type Brand,
  type Config,
  type GetGuestOrders,
  type Order,
  toBlackoutError,
} from '@farfetch/blackout-client';
import merge from 'lodash/merge';
import normalizeFetchOrderResponse from './helpers/normalizeFetchOrderResponse';
import type { CategoryEntity, MerchantEntity } from '../../../entities';
import type { Dispatch } from 'redux';
import type { FetchGuestOrdersAction } from '../../types/actions.types';
import type { GetOptionsArgument, StoreState } from '../../../types';
import type { OrderEntity } from '../../../entities/types/orders.types';
import type { OrderItemEntity } from '../../../entities/types/orderItems.types';

/**
 * Fetches guest user orders.
 *
 * @param getGuestOrders - Get guest orders client.
 *
 * @returns Thunk factory.
 */
const fetchGuestOrdersFactory =
  (getGuestOrders: GetGuestOrders) =>
  (config?: Config) =>
  async (
    dispatch: Dispatch<FetchGuestOrdersAction>,
    getState: () => StoreState,
    {
      getOptions = arg => ({ productImgQueryParam: arg.productImgQueryParam }),
    }: GetOptionsArgument,
  ): Promise<Order[]> => {
    try {
      dispatch({
        type: actionTypes.FETCH_GUEST_ORDERS_REQUEST,
      });

      const result = await getGuestOrders(config);
      const { productImgQueryParam } = getOptions(getState);

      const normalizedResult = result
        .map(order => normalizeFetchOrderResponse(order, productImgQueryParam))
        .reduce(
          (acc, normalizedOrder) => {
            acc.entities = merge(acc.entities, normalizedOrder.entities);
            acc.result.push(normalizedOrder.result);

            return acc;
          },
          {
            entities: {} as {
              orders: Record<string, OrderEntity>;
              orderItems: Record<number, OrderItemEntity>;
              merchants: Record<MerchantEntity['id'], MerchantEntity>;
              brands: Record<Brand['id'], Brand>;
              categories: Record<CategoryEntity['id'], CategoryEntity>;
            },
            result: [] as Array<OrderEntity['id']>,
          },
        );

      dispatch({
        payload: normalizedResult,
        type: actionTypes.FETCH_GUEST_ORDERS_SUCCESS,
      });

      return result;
    } catch (error) {
      const errorAsBlackoutError = toBlackoutError(error);

      dispatch({
        payload: { error: errorAsBlackoutError },
        type: actionTypes.FETCH_GUEST_ORDERS_FAILURE,
      });

      throw errorAsBlackoutError;
    }
  };

export default fetchGuestOrdersFactory;