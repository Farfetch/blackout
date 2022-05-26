import { normalize } from 'normalizr';
import {
  SET_ITEM_TAGS_FAILURE,
  SET_ITEM_TAGS_REQUEST,
  SET_ITEM_TAGS_SUCCESS,
} from '../../actionTypes';
import { toError } from '@farfetch/blackout-client/helpers/client';
import checkoutSchema from '../../../entities/schemas/checkout';
import type { Config } from '@farfetch/blackout-client/types';
import type { Dispatch } from 'redux';
import type {
  GetCheckoutResponse,
  PutItemTags,
} from '@farfetch/blackout-client/checkout/types';

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
 * @param putItemTags - Put item tags client.
 *
 * @returns Thunk factory.
 */
const setItemTagsFactory =
  (putItemTags: PutItemTags) =>
  (id: number, itemId: number, data: string[], config?: Config) =>
  async (dispatch: Dispatch): Promise<GetCheckoutResponse> => {
    try {
      dispatch({
        type: SET_ITEM_TAGS_REQUEST,
      });

      const result = await putItemTags(id, itemId, data, config);

      dispatch({
        payload: normalize(result, checkoutSchema),
        type: SET_ITEM_TAGS_SUCCESS,
      });

      return result;
    } catch (error) {
      dispatch({
        payload: { error: toError(error) },
        type: SET_ITEM_TAGS_FAILURE,
      });

      throw error;
    }
  };

export default setItemTagsFactory;
