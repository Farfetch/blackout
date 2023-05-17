import * as actionTypes from '../../actionTypes.js';
import {
  type Config,
  type Order,
  type OrderItem,
  type PostOrderItemActivity,
  type PostOrderItemActivityData,
  toBlackoutError,
} from '@farfetch/blackout-client';
import type { AddOrderItemActivityAction } from '../../types/actions.types.js';
import type { Dispatch } from 'redux';

/**
 * Method responsible for creating an activity to perform on the order item.
 *
 * @param postOrderItemActivity - Post order item activity client.
 *
 * @returns Promise that will resolve when the call to the endpoint finishes.
 */
const addOrderItemActivityFactory =
  (postOrderItemActivity: PostOrderItemActivity) =>
  (
    orderId: Order['id'],
    itemId: OrderItem['id'],
    data: PostOrderItemActivityData,
    config?: Config,
  ) =>
  async (dispatch: Dispatch<AddOrderItemActivityAction>) => {
    try {
      dispatch({
        type: actionTypes.ADD_ORDER_ITEM_ACTIVITY_REQUEST,
      });

      const result = await postOrderItemActivity(orderId, itemId, data, config);

      dispatch({
        type: actionTypes.ADD_ORDER_ITEM_ACTIVITY_SUCCESS,
      });

      return result;
    } catch (error) {
      const errorAsBlackoutError = toBlackoutError(error);

      dispatch({
        payload: { error: errorAsBlackoutError },
        type: actionTypes.ADD_ORDER_ITEM_ACTIVITY_FAILURE,
      });

      throw errorAsBlackoutError;
    }
  };

export default addOrderItemActivityFactory;
