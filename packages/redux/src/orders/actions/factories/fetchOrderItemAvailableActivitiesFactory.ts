import * as actionTypes from '../../actionTypes';
import {
  Config,
  GetOrderItemAvailableActivities,
  toBlackoutError,
} from '@farfetch/blackout-client';
import type { Dispatch } from 'redux';

/**
 * Method responsible for fetching order item available activities.
 *
 * @param getOrderItemAvailableActivities - Get order item available activities client.
 *
 * @returns Promise that will resolve when the call to the endpoint finishes.
 */
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
