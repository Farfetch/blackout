import * as actionTypes from '../../actionTypes';
import { toError } from '@farfetch/blackout-client/helpers/client';
import type { Config } from '@farfetch/blackout-client/types';
import type { Dispatch } from 'redux';
import type {
  PostOrderItemActivities,
  PostOrderItemActivityData,
} from '@farfetch/blackout-client/orders/types';

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

      await postOrderItemActivities(orderId, itemId, data, config);

      dispatch({
        type: actionTypes.ADD_ORDER_ITEM_ACTIVITIES_SUCCESS,
      });
    } catch (error) {
      dispatch({
        payload: { error: toError(error) },
        type: actionTypes.ADD_ORDER_ITEM_ACTIVITIES_FAILURE,
      });

      throw error;
    }
  };

export default addOrderItemActivities;
