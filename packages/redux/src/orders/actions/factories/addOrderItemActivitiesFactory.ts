import * as actionTypes from '../../actionTypes';
import {
  Config,
  PostOrderItemActivities,
  PostOrderItemActivityData,
  toBlackoutError,
} from '@farfetch/blackout-client';
import type { Dispatch } from 'redux';

/**
 * Method responsible for creating an activity to perform on the order item.
 *
 * @param postOrderItemActivities -
 * @param orderId                 - The identifier of the order.
 * @param itemId                  - The identifier of the item.
 * @param data                    - Request data.
 * @param config                  - Custom configurations to send to the client instance (axios).
 *
 * @returns Promise that will resolve when the call to the endpoint finishes.
 */

const addOrderItemActivities =
  (postOrderItemActivities: PostOrderItemActivities) =>
  (
    orderId: string,
    itemId: string,
    data: PostOrderItemActivityData,
    config?: Config,
  ) =>
  async (dispatch: Dispatch) => {
    try {
      dispatch({
        type: actionTypes.ADD_ORDER_ITEM_ACTIVITIES_REQUEST,
      });

      const result = await postOrderItemActivities(
        orderId,
        itemId,
        data,
        config,
      );

      dispatch({
        type: actionTypes.ADD_ORDER_ITEM_ACTIVITIES_SUCCESS,
      });

      return result;
    } catch (error) {
      dispatch({
        payload: { error: toBlackoutError(error) },
        type: actionTypes.ADD_ORDER_ITEM_ACTIVITIES_FAILURE,
      });

      throw error;
    }
  };

export default addOrderItemActivities;
