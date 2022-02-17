import {
  FETCH_ORDER_ITEM_AVAILABLE_ACTIVITIES_FAILURE,
  FETCH_ORDER_ITEM_AVAILABLE_ACTIVITIES_REQUEST,
  FETCH_ORDER_ITEM_AVAILABLE_ACTIVITIES_SUCCESS,
} from '../../actionTypes';
import type { Config } from '@farfetch/blackout-client/types';
import type { Dispatch } from 'redux';
import type { GetOrderItemAvailableActivities } from '@farfetch/blackout-client/orders/types';

const fetchOrderItemAvailableActivities =
  (getOrderItemAvailableActivities: GetOrderItemAvailableActivities) =>
  (orderId: string, itemId: string, config?: Config) =>
  async (dispatch: Dispatch) => {
    dispatch({
      type: FETCH_ORDER_ITEM_AVAILABLE_ACTIVITIES_REQUEST,
    });

    try {
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
        payload: { error },
        type: FETCH_ORDER_ITEM_AVAILABLE_ACTIVITIES_FAILURE,
      });

      throw error;
    }
  };

export default fetchOrderItemAvailableActivities;
