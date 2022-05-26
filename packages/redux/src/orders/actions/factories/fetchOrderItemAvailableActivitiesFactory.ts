import {
  FETCH_ORDER_ITEM_AVAILABLE_ACTIVITIES_FAILURE,
  FETCH_ORDER_ITEM_AVAILABLE_ACTIVITIES_REQUEST,
  FETCH_ORDER_ITEM_AVAILABLE_ACTIVITIES_SUCCESS,
} from '../../actionTypes';
import { toError } from '@farfetch/blackout-client/helpers/client';
import type { Config } from '@farfetch/blackout-client/types';
import type { Dispatch } from 'redux';
import type { GetOrderItemAvailableActivities } from '@farfetch/blackout-client/orders/types';

const fetchOrderItemAvailableActivities =
  (getOrderItemAvailableActivities: GetOrderItemAvailableActivities) =>
  (orderId: string, itemId: string, config?: Config) =>
  async (dispatch: Dispatch) => {
    try {
      dispatch({
        type: FETCH_ORDER_ITEM_AVAILABLE_ACTIVITIES_REQUEST,
      });

      const result = await getOrderItemAvailableActivities(
        orderId,
        itemId,
        config,
      );

      dispatch({
        type: FETCH_ORDER_ITEM_AVAILABLE_ACTIVITIES_SUCCESS,
      });

      return result;
    } catch (error) {
      dispatch({
        payload: { error: toError(error) },
        type: FETCH_ORDER_ITEM_AVAILABLE_ACTIVITIES_FAILURE,
      });

      throw error;
    }
  };

export default fetchOrderItemAvailableActivities;
