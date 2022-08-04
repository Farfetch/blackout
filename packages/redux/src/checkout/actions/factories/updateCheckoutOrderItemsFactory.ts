import * as actionTypes from '../../actionTypes';
import {
  Config,
  PatchCheckoutOrderItems,
  PatchCheckoutOrderItemsData,
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
  (id: number, data: PatchCheckoutOrderItemsData, config?: Config) =>
  async (dispatch: Dispatch): Promise<number> => {
    try {
      dispatch({
        type: actionTypes.UPDATE_CHECKOUT_ORDER_ITEMS_REQUEST,
      });

      const result = await patchCheckoutOrderItems(id, data, config);

      dispatch({
        type: actionTypes.UPDATE_CHECKOUT_ORDER_ITEMS_SUCCESS,
      });

      return result;
    } catch (error) {
      dispatch({
        payload: { error: toBlackoutError(error) },
        type: actionTypes.UPDATE_CHECKOUT_ORDER_ITEMS_FAILURE,
      });

      throw error;
    }
  };

export default updateCheckoutOrderItemsFactory;
