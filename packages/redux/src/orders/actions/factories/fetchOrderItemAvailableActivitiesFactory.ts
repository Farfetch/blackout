import * as actionTypes from '../../actionTypes';
import {
  Config,
  GetOrderItemAvailableActivities,
  toBlackoutError,
} from '@farfetch/blackout-client';
import type { Dispatch } from 'redux';

const fetchOrderItemAvailableActivities =
  (getOrderItemAvailableActivities: GetOrderItemAvailableActivities) =>
  (orderId: string, itemId: string, config?: Config) =>
  async (dispatch: Dispatch) => {
    try {
      dispatch({
        type: actionTypes.FETCH_ORDER_ITEM_AVAILABLE_ACTIVITIES_REQUEST,
      });

      const result = await getOrderItemAvailableActivities(
        orderId,
        itemId,
        config,
      );

      dispatch({
        type: actionTypes.FETCH_ORDER_ITEM_AVAILABLE_ACTIVITIES_SUCCESS,
      });

      return result;
    } catch (error) {
      dispatch({
        payload: { error: toBlackoutError(error) },
        type: actionTypes.FETCH_ORDER_ITEM_AVAILABLE_ACTIVITIES_FAILURE,
      });

      throw error;
    }
  };

export default fetchOrderItemAvailableActivities;
