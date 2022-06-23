import * as actionTypes from '../../actionTypes';
import {
  Config,
  PatchCheckoutOrderItems,
  PatchCheckoutOrderItemsData,
  toBlackoutError,
} from '@farfetch/blackout-client';
import type { Dispatch } from 'redux';

/**
 * @param id     - Universal identifier of the Checkout.
 * @param data   - Array of objects containing the checkout order id and the checkout item patch
 *                 document reflecting the changes to be made.
 * @param config - Custom configurations to send to the client instance (axios).
 *
 * @returns Thunk to be dispatched to the redux store.
 */

/**
 * Method responsible for adding, editing and removing gift messages to the current
 * checkout order.
 *
 * @param patchCheckoutOrderItems - Patch gift message client.
 *
 * @returns Thunk factory.
 */
const updateGiftMessageFactory =
  (patchCheckoutOrderItems: PatchCheckoutOrderItems) =>
  (id: number, data: PatchCheckoutOrderItemsData, config?: Config) =>
  async (dispatch: Dispatch): Promise<number> => {
    try {
      dispatch({
        type: actionTypes.UPDATE_GIFT_MESSAGE_REQUEST,
      });

      const result = await patchCheckoutOrderItems(id, data, config);

      dispatch({
        type: actionTypes.UPDATE_GIFT_MESSAGE_SUCCESS,
      });

      return result;
    } catch (error) {
      dispatch({
        payload: { error: toBlackoutError(error) },
        type: actionTypes.UPDATE_GIFT_MESSAGE_FAILURE,
      });

      throw error;
    }
  };

export default updateGiftMessageFactory;
