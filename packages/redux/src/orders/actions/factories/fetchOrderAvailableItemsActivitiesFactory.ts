import * as actionTypes from '../../actionTypes.js';
import {
  type Config,
  type GetOrderAvailableItemsActivities,
  toBlackoutError,
} from '@farfetch/blackout-client';
import type { Dispatch } from 'redux';
import type { FetchOrderAvailableItemsActivitiesAction } from '../../types/actions.types.js';

/**
 * Fetches order available items activities.
 *
 * @param getOrderAvailableItemsActivities - Get order available items activities client.
 *
 * @returns Thunk factory.
 */
const fetchOrderAvailableItemsActivities =
  (getOrderAvailableItemsActivities: GetOrderAvailableItemsActivities) =>
  (orderId: string, config?: Config) =>
  async (dispatch: Dispatch<FetchOrderAvailableItemsActivitiesAction>) => {
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
      const errorAsBlackoutError = toBlackoutError(error);

      dispatch({
        payload: { error: errorAsBlackoutError },
        type: actionTypes.FETCH_ORDER_AVAILABLE_ITEMS_ACTIVITIES_FAILURE,
      });

      throw errorAsBlackoutError;
    }
  };

export default fetchOrderAvailableItemsActivities;
