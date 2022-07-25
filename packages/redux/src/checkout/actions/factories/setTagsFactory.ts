import * as actionTypes from '../../actionTypes';
import {
  Config,
  GetCheckoutOrderResponse,
  PutCheckoutOrderTags,
  toBlackoutError,
} from '@farfetch/blackout-client';
import { normalize } from 'normalizr';
import checkoutSchema from '../../../entities/schemas/checkout';
import type { Dispatch } from 'redux';

/**
 * Method responsible for adding tags information.
 *
 * @param putCheckoutOrderTags - Put tags client.
 *
 * @returns Thunk factory.
 */
const setTagsFactory =
  (putCheckoutOrderTags: PutCheckoutOrderTags) =>
  (id: number, data: string[], config?: Config) =>
  async (dispatch: Dispatch): Promise<GetCheckoutOrderResponse> => {
    try {
      dispatch({
        type: actionTypes.SET_TAGS_REQUEST,
      });

      const result = await putCheckoutOrderTags(id, data, config);

      dispatch({
        payload: normalize(result, checkoutSchema),
        type: actionTypes.SET_TAGS_SUCCESS,
      });

      return result;
    } catch (error) {
      dispatch({
        payload: { error: toBlackoutError(error) },
        type: actionTypes.SET_TAGS_FAILURE,
      });

      throw error;
    }
  };

export default setTagsFactory;
