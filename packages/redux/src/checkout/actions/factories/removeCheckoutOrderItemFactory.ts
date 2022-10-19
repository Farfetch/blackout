import * as actionTypes from '../../actionTypes';
import type {
  CheckoutOrder,
  CheckoutOrderItem,
  Config,
  DeleteCheckoutOrderItem,
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
      dispatch({
        payload: { error },
        type: actionTypes.REMOVE_CHECKOUT_ORDER_ITEM_FAILURE,
      });

      throw error;
    }
  };

export default removeCheckoutOrderItemFactory;
