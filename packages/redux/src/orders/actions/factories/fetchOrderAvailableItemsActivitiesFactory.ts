import * as actionTypes from '../../actionTypes';
import { Config, toBlackoutError } from '@farfetch/blackout-client';
import type { Dispatch } from 'redux';
import type { GetOrderAvailableItemsActivities } from '@farfetch/blackout-client/orders/types';

export const fetchOrderAvailableItemsActivitiesFactory =
  (getOrderAvailableItemsActivities: GetOrderAvailableItemsActivities) =>
  (orderId: string, config?: Config) =>
  async (dispatch: Dispatch) => {
    try {
      dispatch({
        type: actionTypes.FETCH_ORDER_AVAILABLE_ITEMS_ACTIVITIES_REQUEST,
      });

      const result = await getOrderAvailableItemsActivities(orderId, config);

      dispatch({
        type: actionTypes.FETCH_ORDER_AVAILABLE_ITEMS_ACTIVITIES_SUCCESS,
      });

      return result;
    } catch (error) {
      dispatch({
        payload: { error: toBlackoutError(error) },
        type: actionTypes.FETCH_ORDER_AVAILABLE_ITEMS_ACTIVITIES_FAILURE,
      });

      throw error;
    }
  };
