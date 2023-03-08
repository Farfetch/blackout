import * as actionTypes from '../../actionTypes.js';
import {
  type CheckoutOrder,
  type CheckoutOrderItem,
  type Config,
  type PatchCheckoutOrderItem,
  type PatchCheckoutOrderItemData,
  toBlackoutError,
} from '@farfetch/blackout-client';
import type { Dispatch } from 'redux';

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
    checkoutOrderId: CheckoutOrder['id'],
    itemId: CheckoutOrderItem['id'],
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
      const errorAsBlackoutError = toBlackoutError(error);

      dispatch({
        payload: { error: errorAsBlackoutError },
        type: actionTypes.UPDATE_CHECKOUT_ORDER_ITEM_FAILURE,
      });

      throw errorAsBlackoutError;
    }
  };

export default updateCheckoutOrderItemFactory;
