import * as actionTypes from '../../actionTypes';
import {
  type CheckoutOrder,
  type CheckoutOrderItem,
  type Config,
  type DeleteCheckoutOrderItem,
  toBlackoutError,
} from '@farfetch/blackout-client';
import type { Dispatch } from 'redux';

/**
 * Method responsible for deleting a checkout order item.
 *
 * @param deleteCheckoutOrderItem - Delete checkout order item client.
 *
 * @returns Thunk factory.
 */
const removeCheckoutOrderItemFactory =
  (deleteCheckoutOrderItem: DeleteCheckoutOrderItem) =>
  (
    checkoutOrderId: CheckoutOrder['id'],
    itemId: CheckoutOrderItem['id'],
    config?: Config,
  ) =>
  async (dispatch: Dispatch): Promise<number> => {
    dispatch({
      type: actionTypes.REMOVE_CHECKOUT_ORDER_ITEM_REQUEST,
    });

    try {
      const result = await deleteCheckoutOrderItem(
        checkoutOrderId,
        itemId,
        config,
      );

      dispatch({
        type: actionTypes.REMOVE_CHECKOUT_ORDER_ITEM_SUCCESS,
      });

      return result;
    } catch (error) {
      const errorAsBlackoutError = toBlackoutError(error);

      dispatch({
        payload: { error: errorAsBlackoutError },
        type: actionTypes.REMOVE_CHECKOUT_ORDER_ITEM_FAILURE,
      });

      throw errorAsBlackoutError;
    }
  };

export default removeCheckoutOrderItemFactory;
