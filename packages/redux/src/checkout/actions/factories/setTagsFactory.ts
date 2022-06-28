import * as actionTypes from '../../actionTypes';
import { normalize } from 'normalizr';
import { toError } from '@farfetch/blackout-client/helpers/client';
import checkoutSchema from '../../../entities/schemas/checkout';
import type {
  Config,
  GetCheckoutOrderResponse,
  PutCheckoutOrderTags,
} from '@farfetch/blackout-client';
import type { Dispatch } from 'redux';

/**
 * @param id     - Universal identifier of the Checkout.
 * @param data   - Array of strings representing the tags you want to add.
 * @param config - Custom configurations to send to the client instance (axios).
 *
 * @returns Thunk to be dispatched to the redux store.
 */

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
        payload: { error: toError(error) },
        type: actionTypes.SET_TAGS_FAILURE,
      });

      throw error;
    }
  };

export default setTagsFactory;
