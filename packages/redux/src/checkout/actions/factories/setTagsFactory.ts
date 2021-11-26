import { normalize } from 'normalizr';
import {
  SET_TAGS_FAILURE,
  SET_TAGS_REQUEST,
  SET_TAGS_SUCCESS,
} from '../../actionTypes';
import checkoutSchema from '../../../entities/schemas/checkout';
import type { Config } from '@farfetch/blackout-client/types';
import type { Dispatch } from 'redux';
import type {
  GetCheckoutResponse,
  PutTags,
} from '@farfetch/blackout-client/checkout/types';

/**
 * @callback SetTagsThunkFactory
 * @param {number} id - Universal identifier of the Checkout.
 * @param {Array} data - Array of strings representing the tags you want to add.
 * @param {object} [config] - Custom configurations to send to the client
 * instance (axios).
 *
 * @returns {Function} Thunk to be dispatched to the redux store.
 */

/**
 * Method responsible for adding tags information.
 *
 * @function setTagsFactory
 * @memberof module:checkout/actions/factories
 *
 * @param {Function} putTags - Put tags client.
 *
 * @returns {SetTagsThunkFactory} Thunk factory.
 */
const setTagsFactory =
  (putTags: PutTags) =>
  (id: number, data: string[], config?: Config) =>
  async (dispatch: Dispatch): Promise<GetCheckoutResponse> => {
    dispatch({
      type: SET_TAGS_REQUEST,
    });

    try {
      const result = await putTags(id, data, config);

      dispatch({
        payload: normalize(result, checkoutSchema),
        type: SET_TAGS_SUCCESS,
      });

      return result;
    } catch (error) {
      dispatch({
        payload: { error },
        type: SET_TAGS_FAILURE,
      });

      throw error;
    }
  };

export default setTagsFactory;
