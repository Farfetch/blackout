import * as actionTypes from '../../actionTypes';
import {
  Config,
  GetCheckoutOrderResponse,
  PutCheckoutOrderItemTags,
  toBlackoutError,
} from '@farfetch/blackout-client';
import { normalize } from 'normalizr';
import checkoutSchema from '../../../entities/schemas/checkout';
import type { Dispatch } from 'redux';

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
        payload: { error: toBlackoutError(error) },
        type: actionTypes.SET_ITEM_TAGS_FAILURE,
      });

      throw error;
    }
  };

export default setItemTagsFactory;
