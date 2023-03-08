import * as actionTypes from '../../actionTypes.js';
import {
  type CheckoutOrder,
  type Config,
  type PatchCheckoutOrderItems,
  type PatchCheckoutOrderItemsData,
  toBlackoutError,
} from '@farfetch/blackout-client';
import type { Dispatch } from 'redux';

/**
 * Method responsible for adding, editing and removing gift messages to the current
 * checkout order.
 *
 * @param patchCheckoutOrderItems - Patch gift message client.
 *
 * @returns Thunk factory.
 */
const updateCheckoutOrderItemsFactory =
  (patchCheckoutOrderItems: PatchCheckoutOrderItems) =>
  (
    checkoutOrderId: CheckoutOrder['id'],
    data: PatchCheckoutOrderItemsData,
    config?: Config,
  ) =>
  async (dispatch: Dispatch): Promise<number> => {
    try {
      dispatch({
        type: actionTypes.UPDATE_CHECKOUT_ORDER_ITEMS_REQUEST,
      });

      const result = await patchCheckoutOrderItems(
        checkoutOrderId,
        data,
        config,
      );

      dispatch({
        type: actionTypes.UPDATE_CHECKOUT_ORDER_ITEMS_SUCCESS,
      });

      return result;
    } catch (error) {
      const errorAsBlackoutError = toBlackoutError(error);

      dispatch({
        payload: { error: errorAsBlackoutError },
        type: actionTypes.UPDATE_CHECKOUT_ORDER_ITEMS_FAILURE,
      });

      throw errorAsBlackoutError;
    }
  };

export default updateCheckoutOrderItemsFactory;
