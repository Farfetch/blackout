import * as actionTypes from '../../actionTypes';
import { normalize } from 'normalizr';
import { toError } from '@farfetch/blackout-client/helpers/client';
import checkoutSchema from '../../../entities/schemas/checkout';
import type {
  Config,
  GetCheckoutOrderResponse,
  PutCheckoutOrderItemTags,
} from '@farfetch/blackout-client';
import type { Dispatch } from 'redux';

/**
 * @param id     - Universal identifier of the Checkout.
 * @param itemId - Universal identifier of the Item.
 * @param data   - Array of strings representing the tags that you want to persist and/or add.
 * @param config - Custom configurations to send to the client instance (axios).
 *
 * @returns Thunk to be dispatched to the redux store.
 */

/**
 * Method responsible for updating the checkout item tags.
 *
 * @param putCheckoutOrderItemTags - Put item tags client.
 *
 * @returns Thunk factory.
 */
const setItemTagsFactory =
  (putCheckoutOrderItemTags: PutCheckoutOrderItemTags) =>
  (id: number, itemId: number, data: string[], config?: Config) =>
  async (dispatch: Dispatch): Promise<GetCheckoutOrderResponse> => {
    try {
      dispatch({
        type: actionTypes.SET_ITEM_TAGS_REQUEST,
      });

      const result = await putCheckoutOrderItemTags(id, itemId, data, config);

      dispatch({
        payload: normalize(result, checkoutSchema),
        type: actionTypes.SET_ITEM_TAGS_SUCCESS,
      });

      return result;
    } catch (error) {
      dispatch({
        payload: { error: toError(error) },
        type: actionTypes.SET_ITEM_TAGS_FAILURE,
      });

      throw error;
    }
  };

export default setItemTagsFactory;
