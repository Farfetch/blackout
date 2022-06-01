import {
  UPDATE_GIFT_MESSAGE_FAILURE,
  UPDATE_GIFT_MESSAGE_REQUEST,
  UPDATE_GIFT_MESSAGE_SUCCESS,
} from '../../actionTypes';
import type { Config } from '@farfetch/blackout-client/types';
import type { Dispatch } from 'redux';
import type {
  PatchGiftMessage,
  PatchGiftMessageData,
} from '@farfetch/blackout-client/checkout/types';

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
 * @param patchGiftMessage - Patch gift message client.
 *
 * @returns Thunk factory.
 */
const updateGiftMessageFactory =
  (patchGiftMessage: PatchGiftMessage) =>
  (id: number, data: PatchGiftMessageData, config?: Config) =>
  async (dispatch: Dispatch): Promise<number> => {
    dispatch({
      type: UPDATE_GIFT_MESSAGE_REQUEST,
    });

    try {
      const result = await patchGiftMessage(id, data, config);

      dispatch({
        type: UPDATE_GIFT_MESSAGE_SUCCESS,
      });

      return result;
    } catch (error) {
      dispatch({
        payload: { error },
        type: UPDATE_GIFT_MESSAGE_FAILURE,
      });

      throw error;
    }
  };

export default updateGiftMessageFactory;
