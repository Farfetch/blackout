import * as actionTypes from '../../actionTypes';
import {
  Config,
  PostOrderItemActivity,
  PostOrderItemActivityData,
  toBlackoutError,
} from '@farfetch/blackout-client';
import type { Dispatch } from 'redux';

/**
 * Method responsible for creating an activity to perform on the order item.
 *
 * @param postOrderItemActivity - Post order item activity client.
 *
 * @returns Promise that will resolve when the call to the endpoint finishes.
 */
const addOrderItemActivity =
  (postOrderItemActivity: PostOrderItemActivity) =>
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

      const result = await postOrderItemActivity(orderId, itemId, data, config);

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

export default addOrderItemActivity;
