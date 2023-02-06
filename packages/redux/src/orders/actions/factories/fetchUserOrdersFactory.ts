import * as actionTypes from '../../actionTypes.js';
import {
  type Config,
  type GetUserOrders,
  type GetUserOrdersQuery,
  type OrderSummaries,
  toBlackoutError,
  type User,
} from '@farfetch/blackout-client';
import { normalize } from 'normalizr';
import generateUserOrdersRequestHash from './helpers/generateUserOrdersRequestHash.js';
import orderSummary from '../../../entities/schemas/orderSummary.js';
import type { Dispatch } from 'redux';
import type { FetchOrdersAction } from '../../types/actions.types.js';
import type {
  OrderSummariesNormalized,
  OrderSummaryEntity,
} from '../../../entities/index.js';

/**
 * Fetches user orders using the specified client.
 *
 * @param getUserOrders - Get user orders client.
 *
 * @returns Thunk factory.
 */
const fetchUserOrdersFactory =
  (getUserOrders: GetUserOrders) =>
  (userId: User['id'], query?: GetUserOrdersQuery, config?: Config) =>
  async (dispatch: Dispatch<FetchOrdersAction>): Promise<OrderSummaries> => {
    const hashedQuery = generateUserOrdersRequestHash(userId, query);

    try {
      dispatch({
        type: actionTypes.FETCH_USER_ORDERS_REQUEST,
        meta: { hash: hashedQuery },
      });

      const result = await getUserOrders(userId, query, config);
      const normalizedResult = normalize<
        OrderSummaryEntity,
        {
          orderSummaries: Record<
            OrderSummaryEntity['merchantOrderCode'],
            OrderSummaryEntity
          >;
        },
        OrderSummariesNormalized
      >(result, { entries: [orderSummary] });

      dispatch({
        payload: normalizedResult,
        meta: { hash: hashedQuery },
        type: actionTypes.FETCH_USER_ORDERS_SUCCESS,
      });

      return result;
    } catch (error) {
      const errorAsBlackoutError = toBlackoutError(error);

      dispatch({
        payload: { error: errorAsBlackoutError },
        meta: { hash: hashedQuery },
        type: actionTypes.FETCH_USER_ORDERS_FAILURE,
      });

      throw errorAsBlackoutError;
    }
  };

export default fetchUserOrdersFactory;
