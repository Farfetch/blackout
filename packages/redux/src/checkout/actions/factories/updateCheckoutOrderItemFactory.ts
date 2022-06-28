import * as actionTypes from '../../actionTypes';
import type {
  Config,
  PatchCheckoutOrderItem,
  PatchCheckoutOrderItemData,
} from '@farfetch/blackout-client';
import type { Dispatch } from 'redux';

/**
 * @param checkoutOrderId - Universal identifier of the Checkout Order
 * @param itemId - Checkout Order item Identifier
 * @param data - Checkout Order item properties to update
 * @param config - Custom configurations to send to the client instance (axios).
 *
 * @returns Thunk to be dispatched to the redux store.
 */

/**
 * Method responsible for updating a checkout order item.
 *
 * @param patchCheckoutOrderItem - Patch checkout order item client.
 *
 * @returns Thunk factory.
 */
const updateCheckoutOrderItemFactory =
  (patchCheckoutOrderItem: PatchCheckoutOrderItem) =>
  (
    checkoutOrderId: number,
    itemId: number,
    data: PatchCheckoutOrderItemData,
    config?: Config,
  ) =>
  async (dispatch: Dispatch): Promise<number> => {
    dispatch({
      type: actionTypes.UPDATE_CHECKOUT_ORDER_ITEM_REQUEST,
    });

    try {
      const result = await patchCheckoutOrderItem(
        checkoutOrderId,
        itemId,
        data,
        config,
      );

      dispatch({
        type: actionTypes.UPDATE_CHECKOUT_ORDER_ITEM_SUCCESS,
      });

      return result;
    } catch (error) {
      dispatch({
        payload: { error },
        type: actionTypes.UPDATE_CHECKOUT_ORDER_ITEM_FAILURE,
      });

      throw error;
    }
  };

export default updateCheckoutOrderItemFactory;
